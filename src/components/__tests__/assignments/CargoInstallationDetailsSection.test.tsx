import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import CargoInstallationDetailsSection from "../../assignments/CargoInstallationDetailsSection";
import { vesselDetails } from "../../../../__mocks__/fake-data/assignmentDetails.json";

describe("CargoInstallationDetailsSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render CargoInstallationDetailsSection correctly as per the ui made when the  cargoInstallationTable has values", () => {
    const { toJSON } = render(
      <CargoInstallationDetailsSection
        cargoInstallationTable={vesselDetails.cargoInstallation}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render CargoInstallationDetailsSection correctly as per the ui made when cargoInstallationTable has no values ", () => {
    const { toJSON } = render(
      <CargoInstallationDetailsSection cargoInstallationTable={[]} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
