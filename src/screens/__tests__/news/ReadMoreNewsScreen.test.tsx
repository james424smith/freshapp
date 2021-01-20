import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import ReadMoreNewsScreen from "../../news/ReadMoreNewsScreen";

describe("ReadMoreNewsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render ReadMoreNewsScreen when loader is false when newItemType is NEWSLETTERSn", () => {
    const route = {
      state: {},
      key: "LatestReleases-E0ArYKZZNpvIFYMFIEyaQ",
      name: "LatestReleases" as "LatestReleases",
      params: {
        newItem: {
          imageUrl: "google.com",
          text: "1234",
          newItemType: "Newsletters",
          document: "1234",
        },
      },
      getState: jest.fn(),
    };

    const { toJSON } = render(<ReadMoreNewsScreen route={route} />);

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ReadMoreNewsScreen when loader is false when newItemType is PressRelease", () => {
    const route = {
      state: {},
      key: "LatestReleases-E0ArYKZZNpvIFYMFIEyaQ",
      name: "LatestReleases" as "LatestReleases",
      params: {
        newItem: {
          imageUrl: "google.com",
          text: "1234",
          newItemType: "PRESS_RELEASE",
          document: "1234",
        },
      },
      getState: jest.fn(),
    };

    const { toJSON } = render(<ReadMoreNewsScreen route={route} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
