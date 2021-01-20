import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import CrewManagerContactDetails from "../../contact/CrewManagerContactDetails";
import { crewingManager } from "../../../../__mocks__/fake-data/contactApi.json";
import * as HandleLink from "../../../common/handleLink";
import MockDate from "mockdate";

describe("CrewManagerContactDetails snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render CrewManagerContactDetails correctly as per the ui made and  photoSmall is defined", () => {
    const { toJSON } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render CrewManagerContactDetails correctly as per the ui made and  photoSmall is undefined", () => {
    const { toJSON } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render CrewManagerContactDetails correctly as per the ui made and the crewManager timezone is defined", () => {
    MockDate.set(1574237559000);
    const { toJSON } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={{
          ...crewingManager.crewingManager,
          timezone: "Asia/Nicosia",
        }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
    MockDate.reset();
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
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("directTelephoneNumber-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "tel",
      crewingManager.crewingManager.directTelephoneNumbers[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when aohTelephoneNumber-button is pressed ", () => {
    const { getByTestId } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("aohTelephoneNumber-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "tel",
      crewingManager.crewingManager.aohTelephoneNumbers[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when email-button is pressed ", () => {
    const { getByTestId } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("email-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "mailto",
      crewingManager.crewingManager.emailAddress[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when skype-button is pressed ", () => {
    const { getByTestId } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("skype-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "skype",
      crewingManager.crewingManager.skypeAddress
    );
    spy.mockRestore();
  });
  it("should call handleLink when website-button is pressed ", () => {
    const { getByTestId } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("website-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "url",
      crewingManager.crewingManager.website[0]
    );
    spy.mockRestore();
  });
  it("should call handleLink when address-button is pressed ", () => {
    const { getByTestId } = render(
      <CrewManagerContactDetails
        crewingManagerDetails={crewingManager.crewingManager}
        photoSmall={{ avatar: "1234", initials: "GI" }}
      />
    );

    const spy = jest.spyOn(HandleLink, "handleLink").mockImplementation();

    fireEvent.press(getByTestId("address-button"));

    expect(HandleLink.handleLink).toHaveBeenCalledWith(
      "url",
      crewingManager.crewingManager.googleMapLink
    );
    spy.mockRestore();
  });
});
