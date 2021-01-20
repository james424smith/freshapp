import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/AuthStyles";
import {
  PRIVACY_POLICY_ROUTE,
  TERMS_AND_CONDITIONS_ROUTE,
} from "../../constants/routes";

type Props = { navigate: (arg: string) => void };

const TermsConditionsPrivacyPolicyLinks = (props: Props) => {
  const { navigate } = props;
  return (
    <View style={styles.conditionsPrivacyPolicyLinks}>
      <View style={styles.privacyPolicyView}>
        <Text style={styles.registerText}>By registering you accept our </Text>
        <TouchableOpacity
          testID={"privacy-policy-button"}
          onPress={() => navigate(PRIVACY_POLICY_ROUTE)}
        >
          <Text style={styles.privacyPolicyLink}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsConditionsView}>
        <Text style={styles.andBetweenStyle}> and </Text>
        <TouchableOpacity
          testID={"terms-and-condition-button"}
          onPress={() => navigate(TERMS_AND_CONDITIONS_ROUTE)}
        >
          <Text style={styles.termsConditionsLink}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsConditionsPrivacyPolicyLinks;
