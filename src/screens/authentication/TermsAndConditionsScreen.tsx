import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import PdfRender from "../../components/PdfRender";
import styles from "../../styles/AuthStyles";
import { TermsAndConditions } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { getTermsAndConditionsDetails } from "../../redux/actions";
import { IRootReducerType } from "../../redux/reducers";

const TermsAndConditionsScreen = () => {
  const termsAndConditions = useSelector<IRootReducerType, TermsAndConditions>(
    ({ termsAndConditionsDetails }) =>
      termsAndConditionsDetails.termsAndConditionsDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTermsAndConditionsDetails());
  }, [dispatch]);

  const pdf = termsAndConditions?.document;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {pdf ? <PdfRender document={pdf} resourceType={"base64"} /> : <View />}
    </ScrollView>
  );
};

export default TermsAndConditionsScreen;
