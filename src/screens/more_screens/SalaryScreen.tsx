import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import styles from "../../styles/more_screens/SalaryAllotmentsStyles";
import { PAYSLIPS, ALLOTMENTS } from "../../constants/salaryConstants";
import TouchableOpacitiesSection from "../../components/TouchableOpacitiesSection";
import { SalaryType, Allotments, PayslipDocuments } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  getPayslipDetails,
  setRefreshingPayslipDetails,
} from "../../redux/actions";
import PayslipDetailsSection from "../../components/salaryScreen/PayslipDetailsSection";
import AllotmentsDetailsSection from "../../components/salaryScreen/AllotmentsDetailsSection";

import { IRootReducerType } from "../../redux/reducers";
import { useNavigation, useTheme } from "@react-navigation/native";

const SalaryScreen = () => {
  const [salaryType, setSalaryType] = useState<SalaryType>(PAYSLIPS);
  const theme = useTheme();
  const navigation = useNavigation();
  const payslips = useSelector<IRootReducerType, PayslipDocuments>(
    ({ payslipDetails }) => payslipDetails.payslipDetails
  );
  const allotmentsDetails = useSelector<IRootReducerType, Allotments>(
    ({ payslipDetails }) => payslipDetails.allotmentsDetails
  );
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ payslipDetails }) => payslipDetails.loader
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPayslipDetails());
  }, [dispatch]);

  const handleSalaryType = (type: SalaryType) => {
    setSalaryType(type);
  };

  const handleRefresh = () => {
    dispatch(setRefreshingPayslipDetails(true));
    dispatch(getPayslipDetails());
  };

  const renderSalaryDetails = (
    payslipsLocal?: PayslipDocuments,
    allotments?: Allotments
  ) => {
    return salaryType === PAYSLIPS ? (
      <PayslipDetailsSection
        payslipRecordTable={payslipsLocal}
        navigate={navigation.navigate}
      />
    ) : (
      <AllotmentsDetailsSection allotmentsRecordTable={allotments} />
    );
  };

  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.opacitiesView}
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <TouchableOpacitiesSection
        handleSelectedOption={handleSalaryType as (arg: unknown) => void}
        selectedOptionFromProps={salaryType}
        firstOption={PAYSLIPS}
        firstOptionLabel={"Payslips"}
        secondOption={ALLOTMENTS}
        secondOptionLabel={"Allotments"}
        backgroundColor={theme.colors.background}
        fontColor={theme.colors.newAquaMarineColor}
        fontWeight={"bold"}
      />

      <View style={styles.stableLineStyle} />
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {renderSalaryDetails(payslips, allotmentsDetails)}
      </ScrollView>
    </ScrollView>
  );
};

export default SalaryScreen;
