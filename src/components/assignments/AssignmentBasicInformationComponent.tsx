import React from "react";
import { StyleProp, View } from "react-native";
import Text from "../StyledText";

type Props = {
  containerStyles: StyleProp<any>;
  labelStyles: StyleProp<any>;
  textValueStyles: StyleProp<any>;
  labelValue: string;
  textValue: string | number;
};

const AssignmentBasicInformationComponent = (props: Props) => {
  const {
    containerStyles,
    textValue,
    labelStyles,
    textValueStyles,
    labelValue,
  } = props;
  return (
    <View style={containerStyles}>
      <Text style={labelStyles}>{labelValue}</Text>
      <Text style={textValueStyles}>{textValue}</Text>
    </View>
  );
};

export default AssignmentBasicInformationComponent;
