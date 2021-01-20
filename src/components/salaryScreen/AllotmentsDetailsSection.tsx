import React from "react";
import { View } from "react-native";
import AllotmentsDetailsComponent from "./AllotmentsDetailsComponent";
import { AllotmentsRecord } from "../../interfaces";
import valueOrDefault from "../../common/valueOrDefault";

type Props = {
  allotmentsRecordTable?: AllotmentsRecord[];
};

const splitAllotmentsRecordItems = (
  allotmentsItem: AllotmentsRecord,
  key: number
) => {
  return (
    <AllotmentsDetailsComponent
      key={key}
      dateText={allotmentsItem.date}
      beneficiaryText={allotmentsItem.beneficiary}
      amountText={allotmentsItem.amount}
      allotmentTypeText={allotmentsItem.allotmentType}
      currencyText={allotmentsItem.currency}
    />
  );
};

const AllotmentsDetailsSection = (props: Props) => {
  const { allotmentsRecordTable } = props;
  return (
    <View>
      {(valueOrDefault(
        allotmentsRecordTable,
        []
      ) as AllotmentsRecord[]).map(
        (allotmentItem: AllotmentsRecord, i: number) =>
          splitAllotmentsRecordItems(allotmentItem, i)
      )}
    </View>
  );
};

export default AllotmentsDetailsSection;
