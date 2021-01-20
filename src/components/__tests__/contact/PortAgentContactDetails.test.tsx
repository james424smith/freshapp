import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import PortAgentContactDetails from "../../contact/PortAgentContactDetails";
import * as HandleLink from "../../../common/handleLink";
import { portAgent } from "../../../../__mocks__/fake-data/contactApi.json";

describe("PortAgentContactDetails snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render PortAgentContactDetails correctly as per the ui made and  photoSmall is defined", () => {
    const { toJSON } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

describe("should test fireEvents", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should call handleLink when directTelephoneNumber-button is pressed ", () => {
    const { getByTestId } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("directTelephoneNumber-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "tel",
      portAgent.directTelephoneNumbers[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when aohTelephoneNumber-button is pressed ", () => {
    const { getByTestId } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("aohTelephoneNumber-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "tel",
      portAgent.aohTelephoneNumbers[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when email-button is pressed ", () => {
    const { getByTestId } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("email-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "mailto",
      portAgent.emailAddress[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when skype-button is pressed ", () => {
    const { getByTestId } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("skype-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "skype",
      portAgent.skypeAddress
    );
    spy.mockRestore();
  });
  it("should call handleLink when website-button is pressed ", () => {
    const { getByTestId } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("website-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "url",
      portAgent.website[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when address-button is pressed ", () => {
    const { getByTestId } = render(
      <PortAgentContactDetails portAgentDetails={portAgent} />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("address-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "url",
      portAgent.googleMapLink
    );
    spy.mockRestore();
  });
});
