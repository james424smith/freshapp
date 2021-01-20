import React from "react";
import SeaServiceList from "../../seaService/SeaServiceList";
import {
  marlowSeaServices,
  nonMarlowSeaServices,
} from "../../../../__mocks__/fake-data/seaServices.json";
import { render, cleanup } from "@testing-library/react-native";

describe("SeaServiceList snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when isMarlow is true", () => {
    const { toJSON } = render(
      <SeaServiceList isMarlow={true} seaServiceTable={marlowSeaServices} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when isMarlow is false", () => {
    const { toJSON } = render(
      <SeaServiceList isMarlow={false} seaServiceTable={nonMarlowSeaServices} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
