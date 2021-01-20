import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import SupportScreen from "../../more_screens/SupportScreen";
import { Auth } from "aws-amplify";
import * as handleLink from "../../../common/handleLink";

describe("SupportScreen snapshot test", () => {
  const spy = jest.spyOn(handleLink, "handleLink");
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spy.mockRestore();
  });

  it("should render SupportScreen when loader is false when user is Signed in", () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: 1234 });

    const { toJSON, getByTestId } = render(<SupportScreen />);

    fireEvent.press(getByTestId("questionnaire-button"));
    fireEvent.press(getByTestId("email-button"));

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SupportScreen when loader is false when user is not Signed in", () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue(false);

    const { toJSON } = render(<SupportScreen />);

    expect(toJSON()).toMatchSnapshot();
  });
});
