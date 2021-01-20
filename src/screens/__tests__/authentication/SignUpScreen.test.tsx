import React from "react";
import SignUpScreen from "../../authentication/SignUpScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import * as axiosWrapper from "../../../common/request";
import { StackActions, useNavigation } from "@react-navigation/native";
import { SIGN_IN_ROUTE, SWIPE_SCREEN_ROUTE } from "../../../constants/routes";

describe("SignUpScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui for signup when succeeds", async () => {
    const spy = jest.spyOn(axiosWrapper, "default").mockResolvedValue({});
    const { toJSON, getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("employee-input"), "some");
    fireEvent.changeText(getByTestId("employee-email-input"), "code@mail.com");
    fireEvent.press(getByTestId("sign-up-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });

  it("should render correct ui for signup when fails with 404", async () => {
    const spy = jest
      .spyOn(axiosWrapper, "default")
      .mockRejectedValue({ status: 404 });
    const { toJSON, getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("employee-input"), "some");
    fireEvent.changeText(getByTestId("employee-email-input"), "code@mail.com");
    fireEvent.press(getByTestId("sign-up-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });
  it("should render correct ui for signup when fails with 500", async () => {
    const spy = jest
      .spyOn(axiosWrapper, "default")
      .mockRejectedValue({ status: 500 });
    const { toJSON, getByTestId } = render(<SignUpScreen />);

    fireEvent.changeText(getByTestId("employee-input"), "some");
    fireEvent.changeText(getByTestId("employee-email-input"), "code@mail.com");
    fireEvent.press(getByTestId("sign-up-button"));
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });
  it("should navigate to signin screen when pressing the button", async () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.press(getByTestId("sign-in-button"));
    await waitFor(() => {
      expect(useNavigation().navigate).toHaveBeenCalledWith(SIGN_IN_ROUTE);
    });
  });
  it("should navigate to signin screen when pressing the more icon", async () => {
    const { getByTestId } = render(<SignUpScreen />);

    fireEvent.press(getByTestId("exit-button"));
    await waitFor(() => {
      expect(StackActions.replace).toHaveBeenCalledWith("Auth", {
        screen: SWIPE_SCREEN_ROUTE,
      });
    });
  });
});
