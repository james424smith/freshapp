import React from "react";
import SeafarerDocumentsTopBar from "../../seafarerDocuments/SeafarerDocumentsTopBar";
import { categories } from "../../../../__mocks__/fake-data/seafarerDocuments.json";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

describe("SeafarerDocumentsTopBar snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when allotmentTypeText", () => {
    const handleDocumentsToShow = jest.fn();
    const { toJSON, getByTestId } = render(
      <SeafarerDocumentsTopBar
        handleDocumentsToShow={handleDocumentsToShow}
        selectedCategory={"1"}
        categories={categories}
      />
    );

    fireEvent.press(getByTestId("category-button-0"));
    expect(handleDocumentsToShow).toHaveBeenCalledWith("3");
    expect(toJSON()).toMatchSnapshot();
  });
});
