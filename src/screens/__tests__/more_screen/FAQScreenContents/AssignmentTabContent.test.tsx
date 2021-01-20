import React from "react";
import AssignmentTabContent from "../../../more_screens/FAQScreenContents/AssignmentTabContent";
import { render, cleanup } from "@testing-library/react-native";

describe("AssignmentTabContent snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for AssignmentTabContent", () => {
    const { toJSON } = render(<AssignmentTabContent />);

    expect(toJSON()).toMatchSnapshot();
  });
});
