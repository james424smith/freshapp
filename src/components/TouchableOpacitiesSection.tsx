import React from "react";
import Text from "./StyledText";
import { TouchableOpacity, View } from "react-native";
import styles from "../styles/AssignmentScreenStyles";
import {
  AssignmentType,
  SeaServiceType,
  NewsType,
  SalaryType,
} from "../interfaces";
import { useTheme, Theme } from "@react-navigation/native";

type OptionsTypes = SeaServiceType | AssignmentType | NewsType | SalaryType;
type Props = {
  handleSelectedOption: (arg: unknown) => void;
  selectedOptionFromProps: OptionsTypes;
  firstOption: OptionsTypes;
  firstOptionLabel: string;
  secondOption: OptionsTypes;
  secondOptionLabel: string;
  backgroundColor?: string;
  fontColor?: string;
  fontWeight?: string;
};

function chooseTouchableOpacityStyle(
  menuOption: OptionsTypes,
  selectedOptionFromProps: OptionsTypes,
  fontColor?: string
) {
  return selectedOptionFromProps === menuOption
    ? [
        styles.activeTouchableOpacity,
        fontColor ? { borderBottomColor: fontColor } : {},
      ]
    : styles.inactiveTouchableOpacity;
}

function chooseTextStyle(
  theme: Theme,
  menuOption: OptionsTypes,
  selectedOptionFromProps: OptionsTypes,
  fontColor?: string,
  fontWeight?: string
) {
  return selectedOptionFromProps === menuOption
    ? [
        {
          ...styles.activeTouchableOpacityLabel,
          color: theme.colors.inactiveTouchableOpacityStyle,
        },
        fontColor ? { color: fontColor } : {},
        fontWeight ? { fontWeight: fontWeight } : {},
      ]
    : [
        {
          ...styles.inactiveTouchableOpacityLabel,
          color: theme.colors.inactiveTouchableOpacityStyle,
        },
      ];
}

function isDisabled(
  menuOption: OptionsTypes,
  selectedOptionFromProps: OptionsTypes
) {
  return menuOption === selectedOptionFromProps;
}

const TouchableOpacitiesSection = (props: Props) => {
  const {
    handleSelectedOption,
    selectedOptionFromProps,
    firstOptionLabel,
    secondOptionLabel,
    firstOption,
    secondOption,
    backgroundColor,
    fontColor,
    fontWeight,
  } = props;
  const theme = useTheme();
  return (
    <View
      style={[
        {
          ...styles.touchableOpacityContainer,
          backgroundColor: theme.colors.primary,
        },
        backgroundColor ? { backgroundColor: backgroundColor } : {},
      ]}
    >
      <TouchableOpacity
        testID="first-option-button"
        style={chooseTouchableOpacityStyle(
          firstOption,
          selectedOptionFromProps,
          fontColor
        )}
        onPress={() => handleSelectedOption(firstOption)}
        disabled={isDisabled(firstOption, selectedOptionFromProps)}
      >
        <Text
          style={chooseTextStyle(
            theme,
            firstOption,
            selectedOptionFromProps,
            fontColor,
            fontWeight
          )}
        >
          {firstOptionLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="second-option-button"
        style={chooseTouchableOpacityStyle(
          secondOption,
          selectedOptionFromProps,
          fontColor
        )}
        onPress={() => handleSelectedOption(secondOption)}
        disabled={isDisabled(secondOption, selectedOptionFromProps)}
      >
        <Text
          style={chooseTextStyle(
            theme,
            secondOption,
            selectedOptionFromProps,
            fontColor,
            fontWeight
          )}
        >
          {secondOptionLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TouchableOpacitiesSection;
