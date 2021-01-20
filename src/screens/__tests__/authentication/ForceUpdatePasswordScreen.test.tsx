import React from "react";
import ForceUpdatePasswordScreen from "../../authentication/ForceUpdatePasswordScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Analytics, Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

describe("ForceUpdatePasswordScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for ForceUpdatePasswordScreen", async () => {
    const route = {
      key: "ForceUpdatePassword-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ForceUpdatePassword" as "ForceUpdatePassword",
      params: { user: {} as CognitoUser },
    };

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Auth.completeNewPassword = jest.fn().mockResolvedValue({});

    const { toJSON, getByTestId } = render(
      <ForceUpdatePasswordScreen route={route} />
    );
    const passwordInput = getByTestId("new-pasword-input");
    const submitButton = getByTestId("submit-button");
    const validatePasswordInput = getByTestId("validate-pasword-input");

    const newPasswordIcon = getByTestId("show-password-icon");
    fireEvent.press(newPasswordIcon);

    const validatePasswordIcon = getByTestId("show-validate-password-icon");

    fireEvent.changeText(passwordInput, "somePassword12!");
    fireEvent(getByTestId("new-pasword-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(validatePasswordIcon);
    fireEvent.changeText(validatePasswordInput, "somePassword12!");
    await waitFor(() => {
      fireEvent.press(submitButton);
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui and completeNewPassword fails", async () => {
    const route = {
      key: "ForceUpdatePassword-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ForceUpdatePassword" as "ForceUpdatePassword",
      params: { user: {} as CognitoUser },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Auth.completeNewPassword = jest.fn().mockRejectedValue({});

    const { toJSON, getByTestId } = render(
      <ForceUpdatePasswordScreen route={route} />
    );

    const passwordInput = getByTestId("new-pasword-input");
    const showPasswordIcon = getByTestId("show-password-icon");
    const submitButton = getByTestId("submit-button");
    const validatePasswordInput = getByTestId("validate-pasword-input");

    fireEvent.press(showPasswordIcon);
    fireEvent.changeText(passwordInput, "somePassword12!");
    fireEvent(getByTestId("new-pasword-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.changeText(validatePasswordInput, "somePassword12!");
    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(toJSON()).toMatchSnapshot();
  });
});
