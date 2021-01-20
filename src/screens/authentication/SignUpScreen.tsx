import React, { useState } from "react";
import axiosWrapper from "../../common/request";
import { Button } from "react-native-elements";
import Input from "../../components/Input";
import TermsConditionsPrivacyPolicyLinks from "../../components/termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import { View, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Text from "../../components/StyledText";
import styles from "../../styles/AuthStyles";
import { SIGN_IN_ROUTE } from "../../constants/routes";
import Colors from "../../constants/styles/colors";
import errorHandling from "../../common/errorHandling";
import EmployeeIdInput from "../../components/EmployeeIdInput";
import { useNavigation, useTheme } from "@react-navigation/native";
import AuthMainView from "../../components/authentication/AuthMainView";
import ExitButton from "../../components/authentication/ExitButton";

export default () => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [employeeEmail, setEmployeeEmail] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const handleSubmit = async (): Promise<void> => {
    setShowLoading(true);
    const payload = {
      seafarerId: employeeId,
      email: employeeEmail,
    };

    try {
      await axiosWrapper({
        requestMethod: "POST",
        endpoint: "signup",
        payload,
      });
    } catch (error) {
      if (error.status === 404) {
        Promise.reject({
          message: JSON.parse(error.bodyString).message,
          code: "signUpOracle",
        });
      } else {
        Promise.reject({
          message: JSON.parse(error.bodyString).message,
          code: "signUpAws",
        });
      }
    }

    await AsyncStorage.setItem("SIGN_IN_PATH", "SIGN_IN");

    Alert.alert(
      "Registration Successful",
      `Check your private email account. You should receive an email with the subject "Your Marlow CrewCompanion Account Registration'. Note: If you did not receive the email please also check Spam and Deleted items folders in case the email was automatically filed in these locations. If you still cannot find the email please contact your Manning Agency to ensure that we have your correct / valid email address entered in your database file.`,
      [
        {
          text: "Ok",
          onPress: () => {
            setShowLoading(false);
            navigation.navigate(SIGN_IN_ROUTE);
          },
        },
      ]
    );
  };
  const mainContent = () => {
    return (
      <View style={styles.forgotPasswordLayout}>
        <ExitButton path={"SWIPE"} />
        <View style={styles.signUpTitleContainer}>
          <Text style={styles.signUpText}>Sign up</Text>
        </View>
        <View style={styles.signUpCredentialsContainer}>
          <EmployeeIdInput
            employeeId={employeeId}
            setEmployeeId={setEmployeeId}
          />
          <Input
            testID={"employee-email-input"}
            containerStyle={{
              ...styles.inputBoxStyle,
              backgroundColor: theme.colors.colorInputText,
            }}
            onChangeText={(newEmployeeEmail: string) =>
              setEmployeeEmail(newEmployeeEmail)
            }
            value={employeeEmail}
            inputStyle={{
              ...styles.inputValueStyle,
              color: theme.colors.text,
            }}
            keyboardAppearance="light"
            placeholder="Email"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="default"
            blurOnSubmit={false}
            placeholderTextColor={Colors.FAQInactiveColor}
            inputContainerStyle={styles.removeUnderline}
            shouldUseFocusedStyles={true}
          />
          <View style={styles.signUpButtonView}>
            <Button
              testID={"sign-up-button"}
              title="Register"
              activeOpacity={1}
              onPress={() => {
                handleSubmit().catch((err: any) => {
                  setShowLoading(false);
                  Alert.alert(
                    "Error while signing up:",
                    errorHandling(err?.code)
                  );
                });
              }}
              loading={showLoading}
              loadingProps={{
                size: "small",
                color: Colors.white,
              }}
              disabled={!employeeId ?? !employeeEmail}
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
          <View style={styles.signUpLoginView}>
            <Text style={styles.signUpLoginText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              testID={"sign-in-button"}
              onPress={() => navigation.navigate(SIGN_IN_ROUTE)}
            >
              <Text style={styles.signUpLoginLink}>Login</Text>
            </TouchableOpacity>
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
