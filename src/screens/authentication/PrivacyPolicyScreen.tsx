import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import styles from "../../styles/AuthStyles";
import PdfRender from "../../components/PdfRender";
import { PrivacyPolicy } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { getPrivacyPolicyDetails } from "../../redux/actions";
import { IRootReducerType } from "../../redux/reducers";

const PrivacyPolicyScreen = () => {
  const dispatch = useDispatch();
  const privacyPolicy = useSelector<IRootReducerType, PrivacyPolicy>(
    ({ privacyPolicyDetails }) => privacyPolicyDetails.privacyPolicyDetails
  );

  useEffect(() => {
    dispatch(getPrivacyPolicyDetails());
  }, [dispatch]);

  const pdf = privacyPolicy?.document;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {pdf ? <PdfRender document={pdf} resourceType={"base64"} /> : <View />}
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
