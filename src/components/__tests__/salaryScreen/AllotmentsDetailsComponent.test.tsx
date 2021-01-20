import React from "react";
import AllotmentsDetailsComponent from "../../salaryScreen/AllotmentsDetailsComponent";
import { render, cleanup } from "@testing-library/react-native";

describe("AllotmentsDetailsComponent snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when allotmentTypeText", () => {
    const { toJSON } = render(
      <AllotmentsDetailsComponent
        allotmentTypeText={"Allotment type"}
        amountText={"amount value"}
        beneficiaryText={"beneficiary value"}
        currencyText={"currency value"}
        dateText={"date"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
