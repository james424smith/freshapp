import React from "react";
import NewsLink from "../NewsLink";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

describe("NewsLink snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui and click the news-button", () => {
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(<NewsLink navigate={navigate} />);
    fireEvent.press(getByTestId("news-button"));
    expect(navigate).toHaveBeenCalledWith("News");
    expect(toJSON()).toMatchSnapshot();
  });
});
