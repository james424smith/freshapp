import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import BiometricLoginSwitch from "../../bioSettingsScreen/BiometricLoginSwitch";

describe("SignInScreen test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correctly as per the ui made when the toggle is enabled ", () => {
    const wrapper = render(
      <BiometricLoginSwitch toggleSwitch={true} isEnabled={true} />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("should render correctly as per the ui made when the toggle is disabled", () => {
    const wrapper = render(
      <BiometricLoginSwitch toggleSwitch={false} isEnabled={false} />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
