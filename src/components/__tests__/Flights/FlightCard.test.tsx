import React from "react";
import FlightCard from "../../flights/FlightCard";
import { render, cleanup } from "@testing-library/react-native";
import { flightData } from "../../../../__mocks__/fake-data/assignmentDetails.json";

describe("ContactScreenTopMenu snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when flight is not cancel", () => {
    const wrapper = render(<FlightCard flight={flightData.flights[0]} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when flight is  cancel", () => {
    const wrapper = render(
      <FlightCard
        flight={{ ...flightData.flights[0], flightNumber: "1234 (CANCEL)" }}
      />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
