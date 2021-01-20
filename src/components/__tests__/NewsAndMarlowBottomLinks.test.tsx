import React from "react";
import NewsAndMarlowBottomLinks from "../NewsAndMarlowBottomLinks";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import * as RNA from "react-native-appearance";

describe("NewsAndMarlowBottomLinks snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when scheme is dark", () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("dark")
    );
    const navigate = jest.fn();
    const { toJSON } = render(<NewsAndMarlowBottomLinks navigate={navigate} />);
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when scheme is light", () => {
    Object.defineProperty(
      RNA,
      "useColorScheme",
      jest.fn().mockReturnValue("light")
    );
    const navigate = jest.fn();
    const { toJSON } = render(<NewsAndMarlowBottomLinks navigate={navigate} />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("NewsAndMarlowBottomLinks fireevent test", () => {
  it("should call navigate to news when clicking the news-button", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <NewsAndMarlowBottomLinks navigate={navigate} />
    );
    fireEvent.press(getByTestId("news-button"));
    expect(navigate).toHaveBeenCalledWith("News");
  });
  it("should call navigate to imprint when clicking the imprint-button", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(
      <NewsAndMarlowBottomLinks navigate={navigate} />
    );
    fireEvent.press(getByTestId("imprint-button"));
    expect(navigate).toHaveBeenCalledWith("Imprint");
  });
});
