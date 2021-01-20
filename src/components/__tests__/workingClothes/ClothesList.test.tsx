import React from "react";
import ClothesList from "../../workingClothes/ClothesList";
import { render, cleanup } from "@testing-library/react-native";
import { workingClothes } from "../../../../__mocks__/fake-data/workingClothes.json";

describe("AppColorScheme snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui and press privacy-policy-button", () => {
    const { toJSON } = render(<ClothesList clothesTable={workingClothes} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
