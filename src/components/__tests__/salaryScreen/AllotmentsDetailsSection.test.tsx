import React from "react";
import AllotmentsDetailsSection from "../../salaryScreen/AllotmentsDetailsSection";
import { render, cleanup } from "@testing-library/react-native";
import allotments from "../../../../__mocks__/fake-data/allotments.json";

describe("AllotmentsDetailsSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when allotmentTypeText", () => {
    const { toJSON } = render(
      <AllotmentsDetailsSection allotmentsRecordTable={allotments} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
