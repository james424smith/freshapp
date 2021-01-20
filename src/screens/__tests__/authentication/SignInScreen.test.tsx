import React from "react";
import SignInScreen from "../../authentication/SignInScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { Platform } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  FORGOT_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
  SWIPE_SCREEN_ROUTE,
} from "../../../constants/routes";

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
describe("SignInScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui for SignInScreen and signin succeeds and platform is ios", async () => {
    Platform.OS = "ios";
    Auth.signIn = jest.fn().mockResolvedValue({ username: 1234 });
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { toJSON, getByTestId, getByRole } = render(<SignInScreen />);
    fireEvent.press(getByRole("checkbox"));

    fireEvent.press(getByTestId("show-password-icon"));

    fireEvent.changeText(getByTestId("employee-id-input"), "some");
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent.changeText(getByTestId("password-input"), "somePassword1992!");
    await waitFor(() => {
      fireEvent.press(getByTestId("sign-in-button"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui for SignInScreen and signin succeeds and platform is ios and user.challengeName is NEW_PASSWORD_REQUIRED", async () => {
    Platform.OS = "ios";
    Auth.signIn = jest
      .fn()
      .mockResolvedValue({ challengeName: "NEW_PASSWORD_REQUIRED" });
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { toJSON, getByTestId, getByRole } = render(<SignInScreen />);
    fireEvent.press(getByRole("checkbox"));

    fireEvent.press(getByTestId("show-password-icon"));

    fireEvent.changeText(getByTestId("employee-id-input"), "some");
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent.changeText(getByTestId("password-input"), "somePassword1992!");
    await waitFor(() => {
      fireEvent.press(getByTestId("sign-in-button"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui for SignInScreen and signin fails and platform is ios", async () => {
    Platform.OS = "ios";
    Auth.signIn = jest.fn().mockRejectedValue({ username: 1234 });
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { toJSON, getByTestId, getByRole } = render(<SignInScreen />);
    fireEvent.press(getByRole("checkbox"));

    fireEvent.press(getByTestId("show-password-icon"));

    fireEvent.changeText(getByTestId("employee-id-input"), "some");
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent.changeText(getByTestId("password-input"), "somePassword1992!");
    await waitFor(() => {
      fireEvent.press(getByTestId("sign-in-button"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui for SignInScreen and signin succeeds and platform is android", async () => {
    Platform.OS = "android";
    Auth.signIn = jest.fn().mockResolvedValue({ username: 1234 });
    Analytics.updateEndpoint = jest.fn().mockRejectedValue({});
    const { toJSON, getByTestId, getByRole } = render(<SignInScreen />);
    fireEvent.press(getByRole("checkbox"));

    fireEvent.press(getByTestId("show-password-icon"));

    fireEvent.changeText(getByTestId("employee-id-input"), "some");
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent(getByTestId("employee-id-input"), "onSubmitEditing", {
      nativeEvent: { text: "some" },
    });
    fireEvent.press(getByRole("checkbox"));
    fireEvent.changeText(getByTestId("password-input"), "somePassword1992!");
    await waitFor(() => {
      fireEvent.press(getByTestId("sign-in-button"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
});

describe("test redirects", () => {
  it("should navigate to swiper when pressing the more icon", async () => {
    const { getByTestId } = render(<SignInScreen />);
    fireEvent.press(getByTestId("exit-button"));
    await waitFor(() => {
      expect(StackActions.replace).toHaveBeenCalledWith("Auth", {
        screen: SWIPE_SCREEN_ROUTE,
      });
    });
  });
  it("should navigate to swiper when pressing the forgot password button", async () => {
    const { getByTestId } = render(<SignInScreen />);
    fireEvent.press(getByTestId("forgot-password-button"));
    await waitFor(() => {
      expect(useNavigation().navigate).toHaveBeenCalledWith(
        FORGOT_PASSWORD_ROUTE
      );
    });
  });
  it("should navigate to swiper when pressing the sign up button", async () => {
    const { getByTestId } = render(<SignInScreen />);
    fireEvent.press(getByTestId("sigu-up-button"));
    await waitFor(() => {
      expect(useNavigation().navigate).toHaveBeenCalledWith(SIGN_UP_ROUTE);
    });
  });
});
