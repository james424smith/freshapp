import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import VesselDetailsSection from "../../assignments/VesselDetailsSection";
import { vesselDetails } from "../../../../__mocks__/fake-data/assignmentDetails.json";

describe("VesselDetailsSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render VesselDetailsSection correctly as per the ui made when vesselImage is defined", () => {
    const { toJSON } = render(
      <VesselDetailsSection vesselDetails={vesselDetails} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render VesselDetailsSection correctly as per the ui made when vesselImage is not defined", () => {
    const { toJSON } = render(
      <VesselDetailsSection
        vesselDetails={{ ...vesselDetails, vesselImage: undefined }}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
