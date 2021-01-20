import React from "react";
import { View } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/more_screens/SalaryAllotmentsStyles";
import { useTheme } from "@react-navigation/native";
type Props = {
  dateText: string;
  beneficiaryText: string;
  amountText: string;
  allotmentTypeText: string;
  currencyText: string;
};

const AllotmentsDetailsComponent = (props: Props) => {
  const { dateText, beneficiaryText, amountText, allotmentTypeText } = props;
  const theme = useTheme();
  return (
    <View style={styles.root}>
      <View style={styles.outerContainer}>
        <View style={styles.firstContainer}>
          <Text style={{ ...styles.label, color: theme.colors.text }}>
            {"Beneficiary"}
          </Text>
          <Text style={{ ...styles.information, color: theme.colors.text }}>
            {beneficiaryText}
          </Text>
        </View>
        <View style={styles.columnContainer}>
          <View style={styles.firstContainer}>
            <Text style={{ ...styles.label, color: theme.colors.text }}>
              {"Date"}
            </Text>
            <Text style={{ ...styles.information, color: theme.colors.text }}>
              {dateText}
            </Text>
          </View>
          <View style={styles.secondContainer}>
            <Text style={{ ...styles.label, color: theme.colors.text }}>
              {"Amount"}
            </Text>
            <Text style={{ ...styles.information, color: theme.colors.text }}>
              {amountText}
            </Text>
          </View>
          <View style={styles.thirdContainer}>
            <Text style={{ ...styles.label, color: theme.colors.text }}>
              {"Type"}
            </Text>
            <Text style={{ ...styles.information, color: theme.colors.text }}>
              {allotmentTypeText}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.separateLine}>
        <Text />
      </View>
    </View>
  );
};

export default AllotmentsDetailsComponent;
