import React from "react";
import LoadingScreen from "../LoadingScreen";
import { render, cleanup } from "@testing-library/react-native";

describe("LoadingScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when both logoHeightSize and logoWidthSize are defined", () => {
    const { toJSON } = render(
      <LoadingScreen logoHeightSize={20} logoWidthSize={20} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when logoHeightSize and logoWidthSize are not defined", () => {
    const { toJSON } = render(<LoadingScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
