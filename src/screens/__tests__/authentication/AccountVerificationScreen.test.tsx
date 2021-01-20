import React from "react";
import AccountVerificationScreen from "../../authentication/AccountVerificationScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

describe("AccountVerificationScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui for AccountVerificationScreen when verificationError is undefined", async () => {
    const route = {
      key: "AccountVerification-wPFrEJG5kjiOrE_Qk2kVs",
      name: "AccountVerification" as "AccountVerification",
      params: { verificationError: undefined },
    };

    const { toJSON, getByTestId } = render(
      <AccountVerificationScreen route={route} />
    );

    fireEvent.press(getByTestId("show-password-icon"));

    fireEvent.changeText(getByTestId("employee-id-input"), "some");
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.changeText(getByTestId("code-input"), "code");
    fireEvent.press(getByTestId("submit-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui for AccountVerificationScreen when verificationError is defined", async () => {
    const route = {
      key: "AccountVerification-wPFrEJG5kjiOrE_Qk2kVs",
      name: "AccountVerification" as "AccountVerification",
      params: { verificationError: "wrong code" },
    };

    const { toJSON, getByTestId } = render(
      <AccountVerificationScreen route={route} />
    );

    fireEvent.press(getByTestId("show-password-icon"));

    fireEvent.changeText(getByTestId("employee-id-input"), "some");
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.changeText(getByTestId("code-input"), "code");
    fireEvent.press(getByTestId("submit-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
