import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import AssignmentBasicInformationComponent from "../../assignments/AssignmentBasicInformationComponent";
import styles from "../../../styles/AssignmentScreenStyles";
import { useTheme } from "@react-navigation/native";

describe("AssignmentBasicInformationComponent snapshot test", () => {
  const theme = useTheme();
  const containerStyles = {
    ...styles.joiningDateItem,
    borderColor: theme.colors.newAquaMarineColor,
  };
  const labelStyles = {
    ...styles.textLabel,
    color: theme.colors.newAquaMarineColor,
  };
  const textValueStyles = {
    ...styles.textValue,
    color: theme.colors.newAquaMarineColor,
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render AssignmentBasicInformationComponent correctly as per the ui made ", () => {
    const wrapper = render(
      <AssignmentBasicInformationComponent
        containerStyles={containerStyles}
        labelStyles={labelStyles}
        textValueStyles={textValueStyles}
        labelValue={"Some Label"}
        textValue={"Some Value"}
      />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
