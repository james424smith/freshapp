import React from "react";
import WebRender from "../WebRender";
import { render, cleanup } from "@testing-library/react-native";

describe("WebRender snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when resourceType is html ", () => {
    const { toJSON } = render(
      <WebRender
        resourceType={"html"}
        stringToRender={"<html><body><p>Hi</p></body></html>"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when resourceType is url ", () => {
    const { toJSON } = render(
      <WebRender
        resourceType={"url"}
        stringToRender={"https://www.google.com/"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
