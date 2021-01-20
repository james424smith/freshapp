import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import AssignmentTopSection from "../../assignments/AssignmentTopSection";
import { useNavigation } from "@react-navigation/native";

describe("AssignmentTopSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render AssignmentBasicInformationComponent correctly as per the ui made ", () => {
    const { toJSON, getByTestId } = render(
      <AssignmentTopSection
        initials={"GI"}
        source={{ uri: "12345" }}
        availabilityDate={"01-01-2021"}
      />
    );
    expect(toJSON()).toMatchSnapshot();
    fireEvent.press(getByTestId("Avatar-press"));
    expect(useNavigation().navigate).toBeCalled();
  });
});
