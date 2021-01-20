import React from "react";
import AuthMainView from "../../authentication/AuthMainView";
import { render, cleanup } from "@testing-library/react-native";
import { View } from "react-native";
import * as RN from "react-native";

describe("AuthMainView snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when platform is ios", () => {
    RN.Platform.OS = "ios";

    const { toJSON } = render(
      <AuthMainView>
        <View />
      </AuthMainView>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when platform is android", () => {
    RN.Platform.OS = "android";

    const { toJSON } = render(
      <AuthMainView>
        <View />
      </AuthMainView>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
