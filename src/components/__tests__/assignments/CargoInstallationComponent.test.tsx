import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import CargoInstallationComponent from "../../assignments/CargoInstallationComponent";

describe("CargoInstallationComponent snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render CargoInstallationComponent correctly as per the ui made ", () => {
    const { toJSON } = render(
      <CargoInstallationComponent
        textLabel={"Some Label"}
        textValue={"Some Value"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
