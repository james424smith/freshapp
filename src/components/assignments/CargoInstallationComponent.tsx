import React from "react";
import { View } from "react-native";
import styles from "../../styles/AssignmentScreenStyles";
import Text from "../StyledText";
import valueOrDefault from "../../common/valueOrDefault";
import { useTheme } from "@react-navigation/native";

type Props = { textLabel: string; textValue: string };

const CargoInstallationComponent = (props: Props) => {
  const { textLabel, textValue } = props;
  const theme = useTheme();
  return (
    <View style={styles.cargoLineStyle}>
      <Text style={{ ...styles.cargoItemLabel, color: theme.colors.text }}>
        {textLabel}:
      </Text>
      <Text style={{ ...styles.cargoItemValue, color: theme.colors.text }}>
        {valueOrDefault(textValue, "-")}
      </Text>
    </View>
  );
};

export default CargoInstallationComponent;
