import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import VesselTrackerScreen from "../../more_screens/VesselTrackerScreen";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const vesselDetails = {
  deadWeightTonnage: 7224,
  beam: 18.45,
  flag: "PMD",
  vesselImage: "1234",
  longitude: -0.243665,
  mainEngineOutput: 5300,
  managingAgent: "K & K",
  vesselSubType: "1ST GENERATION",
  grossTonnage: 6362,
  vesselType: "CONT",
  vesselCode: 863,
  lengthOverall: 121.76,
  draught: 6.69,
  vesselImoNumber: 9143972,
  mainEngineSeries: "L40/54",
  name: "WEC BRUEGHEL",
  mainEngineMaker: "MAN B&W",
  cargoInstallation: [
    [
      {
        label: "Number",
        key: "number",
        value: "2",
      },
      {
        label: "Unit",
        key: "unit",
        value: "TO",
      },
      {
        label: "Cargo Installation",
        key: "cargoInstallation",
        value: "CRANES",
      },
      {
        label: "Capacity",
        key: "capacity",
        value: "250",
      },
    ],
  ],
  latitude: 37.891758,
  lengthBetweenPerpendiculars: 114.9,
};

describe("VesselTrackerScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render VesselTrackerScreen when vesselDetails is defined ", () => {
    const mockedState = {
      assignmentDetails: {
        assignmentDetails: [
          {
            vesselDetails,
          },
        ],
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <VesselTrackerScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("go-to-current-position"));

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render VesselTrackerScreen when vesselDetails is undefined", () => {
    const mockedState = {
      assignmentDetails: {
        assignmentDetails: [
          {
            vesselDetails: undefined,
          },
        ],
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <VesselTrackerScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
