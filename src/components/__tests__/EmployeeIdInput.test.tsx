import React from "react";
import EmployeeIdInput from "../EmployeeIdInput";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

describe("EmployeeIdInput snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui and change value of employeeId", () => {
    const setEmployeeId = jest.fn();
    const { toJSON, getByTestId } = render(
      <EmployeeIdInput employeeId={"1234"} setEmployeeId={setEmployeeId} />
    );

    fireEvent.changeText(getByTestId("employee-input"), "12345");
    expect(setEmployeeId).toHaveBeenCalledWith("12345");
    expect(toJSON()).toMatchSnapshot();
  });
});
