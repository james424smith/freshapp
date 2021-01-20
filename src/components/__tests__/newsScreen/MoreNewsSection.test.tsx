import React from "react";
import MoreNewsSection from "../../newsScreen/MoreNewsSection";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

describe("MoreNewsSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui", () => {
    const navigation = jest.fn();

    const { toJSON } = render(
      <MoreNewsSection
        title="title"
        summary="summary"
        navigate={navigation}
        newItemType={"Newsletters"}
        newItem={{
          document: "1234",
          title: "title",
          summary: "",
        }}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("firevents tests", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("should call navigate when news-button is pressed", () => {
    const navigation = jest.fn();

    const { getByTestId } = render(
      <MoreNewsSection
        title="title"
        summary="summary"
        navigate={navigation}
        newItemType={"Newsletters"}
        newItem={{
          document: "1234",
          title: "title",
          summary: "",
        }}
      />
    );
    fireEvent.press(getByTestId("news-button"));
    expect(navigation).toHaveBeenCalledWith("ReadMoreNews", {
      newItem: {
        document: "1234",
        title: "title",
        summary: "",
        newItemType: "Newsletters",
      },
    });
  });
  it("should call navigate when readmore-button is pressed", () => {
    const navigation = jest.fn();

    const { getByTestId } = render(
      <MoreNewsSection
        title="title"
        summary="summary"
        navigate={navigation}
        newItemType={"Newsletters"}
        newItem={{
          document: "1234",
          title: "title",
          summary: "",
        }}
      />
    );
    fireEvent.press(getByTestId("readmore-button"));
    expect(navigation).toHaveBeenCalledWith("ReadMoreNews", {
      newItem: {
        document: "1234",
        title: "title",
        summary: "",
        newItemType: "Newsletters",
      },
    });
  });
});
