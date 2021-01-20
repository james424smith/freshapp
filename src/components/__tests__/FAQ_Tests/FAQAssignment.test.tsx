import React from "react";
import { render, cleanup, RenderAPI } from "@testing-library/react-native";
import { Assignment } from "../../../screens/more_screens/FAQScreenContents";
import "@testing-library/jest-native/extend-expect";

describe("FAQ Screen UI test", () => {
  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(<Assignment />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("Should render the screen as UI", () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
