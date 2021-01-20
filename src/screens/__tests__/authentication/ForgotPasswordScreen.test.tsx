import React from "react";
import ForgotPasswordScreen from "../../authentication/ForgotPasswordScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { StackActions } from "@react-navigation/native";
import { SIGN_IN_ROUTE } from "../../../constants/routes";
import { Alert } from "react-native";

Amplify.configure({
  aws_project_region: "eu-west-1",
  aws_cognito_identity_pool_id:
    "eu-west-1:0700dd4d-d3f1-47e8-aeca-c03a916aba97",
  aws_cognito_region: "eu-west-1",
  aws_user_pools_id: "eu-west-1_VdCn6sWLK",
  aws_user_pools_web_client_id: "3uc4kul2beqktthivc578jutfm",
  oauth: {},
  aws_mobile_analytics_app_id: "33c953d8b8a04972904e65148ea64665",
  aws_mobile_analytics_app_region: "eu-west-1",
});
describe("ForgotPasswordScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for ForgotPasswordScreen", async () => {
    Auth.forgotPassword = jest.fn().mockResolvedValue({});
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { toJSON, getByTestId } = render(<ForgotPasswordScreen />);
    Alert.alert = jest.fn();
    fireEvent.changeText(getByTestId("employee-input"), "somePassword12!");

    fireEvent.press(getByTestId("submit-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui and completeNewPassword fails", async () => {
    Auth.forgotPassword = jest.fn().mockRejectedValue({});
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { toJSON, getByTestId } = render(<ForgotPasswordScreen />);

    fireEvent.changeText(getByTestId("employee-input"), "somePassword12!");

    fireEvent.press(getByTestId("submit-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui when pressomg the close Icon", () => {
    const spy = jest.spyOn(Alert, "alert");
    Auth.forgotPassword = jest.fn().mockRejectedValue({});
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { getByTestId } = render(<ForgotPasswordScreen />);

    fireEvent.press(getByTestId("exit-button"));

    expect(StackActions.replace).toHaveBeenCalledWith("Auth", {
      screen: SIGN_IN_ROUTE,
    });
    spy.mockRestore();
  });
});
