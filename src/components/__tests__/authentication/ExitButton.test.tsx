import React from "react";
import ExitButton from "../../authentication/ExitButton";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";

describe("ExitButton snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui and press the exit icon", () => {
    RN.Platform.OS = "ios";

    const { toJSON, getByTestId } = render(<ExitButton path={"SIGN_IN"} />);

    fireEvent.press(getByTestId("exit-button"));

    expect(useNavigation().dispatch).toHaveBeenCalledTimes(1);
    expect(toJSON()).toMatchSnapshot();
  });
});
