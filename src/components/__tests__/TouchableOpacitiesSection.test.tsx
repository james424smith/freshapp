import React from "react";
import TouchableOpacitiesSection from "../TouchableOpacitiesSection";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

describe("TouchableOpacitiesSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when everetyhing is definfed", () => {
    const handleSelectedOption = jest.fn();
    const { toJSON } = render(
      <TouchableOpacitiesSection
        handleSelectedOption={handleSelectedOption}
        selectedOptionFromProps={"Allotments"}
        firstOption={"Allotments"}
        firstOptionLabel={"allotments"}
        secondOption={"Payslips"}
        secondOptionLabel={"payslips"}
        backgroundColor="black"
        fontColor={"black"}
        fontWeight={"100"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when all optional props are undefinfed", () => {
    const handleSelectedOption = jest.fn();
    const { toJSON } = render(
      <TouchableOpacitiesSection
        handleSelectedOption={handleSelectedOption}
        selectedOptionFromProps={"Allotments"}
        firstOption={"Allotments"}
        firstOptionLabel={"allotments"}
        secondOption={"Payslips"}
        secondOptionLabel={"payslips"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("TouchableOpacitiesSection firevent test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should call aprropriate action when first-option-button is press and option is not available", () => {
    const handleSelectedOption = jest.fn();
    const { getByTestId } = render(
      <TouchableOpacitiesSection
        handleSelectedOption={handleSelectedOption}
        selectedOptionFromProps={"Allotments"}
        firstOption={"Allotments"}
        firstOptionLabel={"allotments"}
        secondOption={"Payslips"}
        secondOptionLabel={"payslips"}
        backgroundColor="black"
        fontColor={"black"}
        fontWeight={"100"}
      />
    );
    fireEvent.press(getByTestId("first-option-button"));
    expect(handleSelectedOption).toHaveBeenCalledTimes(0);
  });

  it("should call aprropriate action when first-option-button is pressed and option is available", () => {
    const handleSelectedOption = jest.fn();
    const { getByTestId } = render(
      <TouchableOpacitiesSection
        handleSelectedOption={handleSelectedOption}
        selectedOptionFromProps={"Allotments"}
        firstOption={"Payslips"}
        firstOptionLabel={"payslips"}
        secondOption={"Allotments"}
        secondOptionLabel={"allotments"}
        backgroundColor="black"
        fontColor={"black"}
        fontWeight={"100"}
      />
    );
    fireEvent.press(getByTestId("first-option-button"));
    expect(handleSelectedOption).toHaveBeenCalledWith("Payslips");
  });
  it("should call aprropriate action when second-option-button is pressed and option is available", () => {
    const handleSelectedOption = jest.fn();
    const { getByTestId } = render(
      <TouchableOpacitiesSection
        handleSelectedOption={handleSelectedOption}
        selectedOptionFromProps={"Allotments"}
        firstOption={"Allotments"}
        firstOptionLabel={"allotments"}
        secondOption={"Payslips"}
        secondOptionLabel={"payslips"}
        backgroundColor="black"
        fontColor={"black"}
        fontWeight={"100"}
      />
    );
    fireEvent.press(getByTestId("second-option-button"));
    expect(handleSelectedOption).toHaveBeenCalledWith("Payslips");
  });
});
