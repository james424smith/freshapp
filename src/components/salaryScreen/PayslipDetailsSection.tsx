import React from "react";
import { View } from "react-native";
import PayslipDetailsComponent from "./PayslipDetailsComponent";
import { PayslipRecord } from "../../interfaces";
import { useTheme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

interface Props {
  payslipRecordTable?: PayslipRecord[];
  navigate: (arg: string) => void;
}

const splitPayslipRecordItems = (
  payslipItem: PayslipRecord,
  key: number,
  navigate: (arg: string) => void
) => {
  return (
    <PayslipDetailsComponent
      key={key}
      payslipDocument={payslipItem}
      navigate={navigate}
    />
  );
};

const PayslipDetailsSection = (props: Props) => {
  const { payslipRecordTable, navigate } = props;
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      {(valueOrDefault(
        payslipRecordTable,
        []
      ) as PayslipRecord[]).map((payslipItem: PayslipRecord, i: number) =>
        splitPayslipRecordItems(payslipItem, i, navigate)
      )}
    </View>
  );
};

export default PayslipDetailsSection;
