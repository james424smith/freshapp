import React from "react";
import LoginAndPasswordTab from "../../../more_screens/FAQScreenContents/LoginAndPasswordTab";
import { render, cleanup } from "@testing-library/react-native";

describe("LoginAndPasswordTab snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for LoginAndPasswordTab", () => {
    const { toJSON } = render(<LoginAndPasswordTab />);

    expect(toJSON()).toMatchSnapshot();
  });
});
