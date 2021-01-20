import React from "react";
import ShoeSizeTable from "../../workingClothes/ShoeSizeTable";
import { render, cleanup } from "@testing-library/react-native";
import workingClothes from "../../../../__mocks__/fake-data/workingClothes.json";

describe("AppColorScheme snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui and press privacy-policy-button", () => {
    const { toJSON } = render(
      <ShoeSizeTable
        headings={["PHL", "US", "EU", "UK"]}
        sizeData={[
          [
            workingClothes.shoeSizePhl,
            workingClothes.shoeSizeUs,
            workingClothes.shoeSizeEu,
            workingClothes.shoeSizeUk,
          ],
        ]}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
