import React from "react";
import { View } from "react-native";
import styles from "../../styles/AssignmentScreenStyles";
import Text from "../StyledText";

type Props = { textLabel: string; textValue: string | number };

const VesselDetailsComponent = (props: Props) => {
  const { textLabel, textValue } = props;
  return (
    <View style={styles.vesselDetails}>
      <Text style={styles.vesselDetailsLabel}>{textLabel}</Text>
      <Text style={styles.vesselDetailsValue}>{textValue}</Text>
    </View>
  );
};

export default VesselDetailsComponent;
