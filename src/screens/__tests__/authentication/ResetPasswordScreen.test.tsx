import React from "react";
import ResetPasswordScreen from "../../authentication/ResetPasswordScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Analytics, Auth } from "aws-amplify";

describe("ResetPasswordScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for ResetPasswordScreen", async () => {
    const route = {
      key: "ResetPassword-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ResetPassword" as "ResetPassword",
      params: { employeeId: "1234", verificationCode: "1234" },
    };

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Auth.forgotPasswordSubmit = jest.fn().mockResolvedValue({});

    const { toJSON, getByTestId } = render(
      <ResetPasswordScreen route={route} />
    );
    const passwordInput = getByTestId("new-password-input");
    const submitButton = getByTestId("submit-button");
    const validatePasswordInput = getByTestId("validate-pasword-input");
    const newPasswordIcon = getByTestId("show-password-icon");
    const validatePasswordIcon = getByTestId("show-validate-password-icon");

    fireEvent.press(newPasswordIcon);
    fireEvent.press(validatePasswordIcon);

    fireEvent.changeText(passwordInput, "somePassword12!");
    fireEvent(passwordInput, "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.changeText(validatePasswordInput, "somePassword12!");
    await waitFor(() => {
      fireEvent.press(submitButton);
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui and completeNewPassword fails", async () => {
    const route = {
      key: "ResetPassword-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ResetPassword" as "ResetPassword",
      params: { employeeId: "1234", verificationCode: "1234" },
    };

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Auth.forgotPasswordSubmit = jest.fn().mockRejectedValue({});

    const { toJSON, getByTestId } = render(
      <ResetPasswordScreen route={route} />
    );

    const passwordInput = getByTestId("new-password-input");
    const showPasswordIcon = getByTestId("show-password-icon");
    const submitButton = getByTestId("submit-button");
    const validatePasswordInput = getByTestId("validate-pasword-input");

    fireEvent.press(showPasswordIcon);
    fireEvent.changeText(passwordInput, "somePassword12!");
    fireEvent(passwordInput, "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.changeText(validatePasswordInput, "somePassword12!");
    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(toJSON()).toMatchSnapshot();
  });
});
