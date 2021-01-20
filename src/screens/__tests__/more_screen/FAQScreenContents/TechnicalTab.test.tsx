import React from "react";
import TechnicalTab from "../../../more_screens/FAQScreenContents/TechnicalTab";
import { render, cleanup } from "@testing-library/react-native";

describe("TechnicalTab snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for TechnicalTab", () => {
    const { toJSON } = render(<TechnicalTab />);

    expect(toJSON()).toMatchSnapshot();
  });
});
