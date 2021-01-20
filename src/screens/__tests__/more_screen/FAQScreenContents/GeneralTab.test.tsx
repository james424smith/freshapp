import React from "react";
import GeneralTab from "../../../more_screens/FAQScreenContents/GeneralTab";
import { render, cleanup } from "@testing-library/react-native";

describe("GeneralTab snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for GeneralTab", () => {
    const { toJSON } = render(<GeneralTab />);

    expect(toJSON()).toMatchSnapshot();
  });
});
