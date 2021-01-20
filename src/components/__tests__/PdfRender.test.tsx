import React from "react";
import PdfRender from "../PdfRender";
import { render, cleanup } from "@testing-library/react-native";

describe("PdfRender snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui", () => {
    const { toJSON } = render(
      <PdfRender document={"1234"} resourceType={"base64"} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
