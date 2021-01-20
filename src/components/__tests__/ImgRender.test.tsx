import React from "react";
import ImgRender from "../ImgRender";
import { render, cleanup } from "@testing-library/react-native";

describe("ImgRender snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when resourceType is base64", () => {
    const { toJSON } = render(
      <ImgRender document={"1234"} fileType="jpg" resourceType={"base64"} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when resourceType is file", () => {
    const { toJSON } = render(
      <ImgRender document={"1234"} fileType="jpg" resourceType={"file"} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
