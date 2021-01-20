import React from "react";
import PersonalInfoTab from "../../../more_screens/FAQScreenContents/PersonalInfoTab";
import { render, cleanup } from "@testing-library/react-native";

describe("PersonalInfoTab snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for PersonalInfoTab", () => {
    const { toJSON } = render(<PersonalInfoTab />);

    expect(toJSON()).toMatchSnapshot();
  });
});
