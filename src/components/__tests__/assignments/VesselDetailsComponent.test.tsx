import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import VesselDetailsComponent from "../../assignments/VesselDetailsComponent";

describe("CargoInstallationComponent snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render CargoInstallationComponent correctly as per the ui made ", () => {
    const { toJSON } = render(
      <VesselDetailsComponent
        textLabel={"Some Label"}
        textValue={"Some Value"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
