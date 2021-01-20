import React from "react";
import RegistrationTab from "../../../more_screens/FAQScreenContents/RegistrationTab";
import { render, cleanup } from "@testing-library/react-native";

describe("RegistrationTab snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for RegistrationTab", () => {
    const { toJSON } = render(<RegistrationTab />);

    expect(toJSON()).toMatchSnapshot();
  });
});
