import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { View, Alert } from "react-native";
import Text from "../../components/StyledText";
import { Button } from "react-native-elements";
import styles from "../../styles/AuthStyles";
import TermsConditionsPrivacyPolicyLinks from "../../components/termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import { ACCOUNT_VERIFICATION_ROUTE } from "../../constants/routes";
import Colors from "../../constants/styles/colors";
import { useTheme, useNavigation } from "@react-navigation/native";
import EmployeeIdInput from "../../components/EmployeeIdInput";
import errorHandling from "../../common/errorHandling";
import AsyncStorage from "@react-native-community/async-storage";
import ExitButton from "../../components/authentication/ExitButton";
import AuthMainView from "../../components/authentication/AuthMainView";

export default () => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const theme = useTheme();

  const forgotPassword = async () => {
    setShowLoading(true);
    await AsyncStorage.setItem("employeeID", employeeId);
    await Auth.forgotPassword(employeeId);
    Alert.alert(errorHandling("ForgotPassword"));
    setShowLoading(false);
    navigation.navigate(ACCOUNT_VERIFICATION_ROUTE, { employeeId });
  };

  const mainContent = () => {
    return (
      <View style={styles.forgotPasswordLayout}>
        <ExitButton path={"SIGN_IN"} />
        <View style={styles.forgotPasswordTitleContainer}>
          <Text style={styles.forgotPasswordTitle}>Forgot password?</Text>
        </View>
        <View style={styles.forgotPasswordCredentialsContainer}>
          <Text style={styles.forgotPasswordEmployeeText}>
            Check your email for a verification code.
          </Text>
          <EmployeeIdInput
            employeeId={employeeId}
            setEmployeeId={setEmployeeId}
          />
          <View style={styles.signUpButtonView}>
            <Button
              testID={"submit-button"}
              title="Next"
              activeOpacity={1}
              onPress={async () => {
                setShowLoading(false);
                await forgotPassword().catch(() => {
                  setShowLoading(false);
                  Alert.alert(
                    "We are authenticating your request.",
                    errorHandling("ForgotPassword")
                  );
                  navigation.navigate(ACCOUNT_VERIFICATION_ROUTE);
                });
              }}
              loading={showLoading}
              loadingProps={{
                size: "small",
                color: Colors.white,
              }}
              disabled={!employeeId}
              disabledStyle={{
                backgroundColor: theme.colors.DisableSignInButtonColor,
              }}
              buttonStyle={{
                ...styles.signUpButton,
                backgroundColor: theme.colors.signInButtonColor,
              }}
              disabledTitleStyle={{
                color: theme.colors.whiteAndBlack,
              }}
              titleStyle={styles.textOnButton}
            />
          </View>
        </View>
        <View style={styles.forgotPasswordTermsConditionsContainer}>
          <View style={styles.termsConditionsView}>
            <TermsConditionsPrivacyPolicyLinks navigate={navigation.navigate} />
          </View>
        </View>
      </View>
    );
  };

  return <AuthMainView>{mainContent()}</AuthMainView>;
};
