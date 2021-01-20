import React from "react";
import Input from "../Input";
import Colors from "../../constants/styles/colors";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
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
    const { toJSON, getByTestId } = render(
      <Input
        testID={"input"}
        shouldUseFocusedStyles={true}
        containerStyle={{}}
        value="2345"
        inputStyle={{}}
        onChangeText={jest.fn()}
        placeholder="value"
        keyboardAppearance="default"
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        inputContainerStyle={{}}
        keyboardType="default"
        returnKeyType="default"
        placeholderTextColor={Colors.FAQInactiveColor}
      />
    );

    fireEvent(getByTestId("input"), "focus");
    fireEvent(getByTestId("input"), "blur");

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when scheme is dark when shouldUseFocusedStyles is false", () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("dark")
    );
    const { toJSON } = render(
      <Input
        shouldUseFocusedStyles={false}
        containerStyle={{}}
        value="2345"
        inputStyle={{}}
        onChangeText={jest.fn()}
        placeholder="value"
        keyboardAppearance="default"
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        inputContainerStyle={{}}
        keyboardType="default"
        returnKeyType="default"
        placeholderTextColor={Colors.FAQInactiveColor}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
