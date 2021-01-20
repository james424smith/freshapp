import React from "react";
import GradientBackground from "../../authentication/GradientBackground";
import { render, cleanup } from "@testing-library/react-native";
import { View } from "react-native";
import * as RNA from "react-native-appearance";

describe("BackIcon snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when scheme is dark", () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("dark")
    );
    const { toJSON } = render(
      <GradientBackground>
        <View />
      </GradientBackground>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when scheme is light", () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("light")
    );
    const { toJSON } = render(
      <GradientBackground>
        <View />
      </GradientBackground>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
