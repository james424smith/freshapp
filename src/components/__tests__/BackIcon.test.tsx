import React from "react";
import BackIcon from "../BackIcon";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

describe("BackIcon snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui and press icon when goBack is true", () => {
    const { toJSON, getByTestId } = render(<BackIcon goBack={true} />);

    fireEvent.press(getByTestId("back-button"));
    expect(useNavigation().goBack).toHaveBeenCalledTimes(1);
    expect(useNavigation().navigate).toHaveBeenCalledTimes(0);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui and press icon when goBack is false", () => {
    const { toJSON, getByTestId } = render(
      <BackIcon goBack={false} path="Assignment" />
    );

    fireEvent.press(getByTestId("back-button"));
    expect(useNavigation().goBack).toHaveBeenCalledTimes(0);
    expect(useNavigation().navigate).toHaveBeenCalledWith("Assignment");
    expect(toJSON()).toMatchSnapshot();

    expect(toJSON()).toMatchSnapshot();
  });
});
