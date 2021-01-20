import React, { useState } from "react";
import { Auth } from "aws-amplify";
import TermsConditionsPrivacyPolicyLinks from "../../components/termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import { View, TouchableOpacity } from "react-native";
import { ACCOUNT_VERIFICATION_ROUTE } from "../../constants/routes";
import Text from "../../components/StyledText";
import { Button, Input } from "react-native-elements";
import InputElement from "../../components/Input";
import styles from "../../styles/AuthStyles";
import Colors from "../../constants/styles/colors";
import {
  RouteProp,
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import AuthMainView from "../../components/authentication/AuthMainView";
import ExitButton from "../../components/authentication/ExitButton";
import { AuthStackParamList } from "../../navigation/AppNavigator";
import EyeOff from "../../../assets/icons/eye-off.svg";
import EyeOn from "../../../assets/icons/eye-on.svg";
import PasswordValidationsSection from "../../components/authentication/PasswordValidationsSection";

interface Props {
  route: RouteProp<AuthStackParamList, "ResetPassword">;
}

const ResetPasswordScreen = (props: Props) => {
  const passwordValidationRef = React.useRef<Input | null>(null);
  const theme = useTheme();
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { route } = props;
  const resetPassword = async () => {
    try {
      setShowLoading(true);
      const employeeId = route.params?.employeeId;
      const emailCode = route.params?.verificationCode;
      await Auth.forgotPasswordSubmit(employeeId, emailCode, password);
      setShowLoading(false);
      navigation.dispatch(StackActions.replace("Auth", { screen: "SignIn" }));
    } catch (error) {
      navigation.navigate(ACCOUNT_VERIFICATION_ROUTE, {
        verificationError: "*Incorrect code. Try again",
      });
    }
  };

  const [allValid, setAllValid] = useState<boolean>(false);
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);
  const [shouldShowRptPassword, setShouldShowRptPassword] = useState<boolean>(
    false
  );

  const mainContent = () => {
    return (
      <View style={styles.resetPasswordLayout}>
        <ExitButton path={"SIGN_IN"} />
        <View />
        <View style={styles.resetForgotPasswordTitleContainer}>
          <Text style={styles.resetPasswordText}>Create new password</Text>
        </View>
        <View style={styles.forgotPasswordCredentialsContainer}>
          <InputElement
            testID="new-password-input"
            containerStyle={{
              ...styles.inputBoxStyleForgotPassword,
              backgroundColor: theme.colors.colorInputText,
            }}
            onChangeText={(newPassword) => setPassword(newPassword)}
            inputStyle={styles.inputValueStyle}
            value={password}
            secureTextEntry={!shouldShowPassword}
            keyboardAppearance="light"
            placeholder="New password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordValidationRef.current &&
                passwordValidationRef.current.focus();
            }}
            blurOnSubmit={false}
            placeholderTextColor={Colors.FAQInactiveColor}
            inputContainerStyle={[
              styles.removeUnderline,
              styles.centerInputText,
            ]}
            shouldUseFocusedStyles={true}
            rightIcon={
              <TouchableOpacity
                testID="show-password-icon"
                onPress={() => setShouldShowPassword(!shouldShowPassword)}
              >
                {shouldShowPassword ? (
                  <EyeOn width={20} height={20} fill={"#000"} />
                ) : (
                  <EyeOff width={20} height={20} fill={"#fff"} />
                )}
              </TouchableOpacity>
            }
          />
          <InputElement
            testID={"validate-pasword-input"}
            containerStyle={{
              ...styles.inputBoxStyleForgotPassword,
              backgroundColor: theme.colors.colorInputText,
            }}
            onChangeText={(newPasswordValidation) =>
              setPasswordValidation(newPasswordValidation)
            }
            value={passwordValidation}
            secureTextEntry={!shouldShowRptPassword}
            inputStyle={styles.inputValueStyle}
            keyboardAppearance="light"
            placeholder="Repeat new password"
            autoCapitalize="none"
            shouldUseFocusedStyles={true}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="default"
            ref={passwordValidationRef}
            blurOnSubmit={false}
            placeholderTextColor={Colors.FAQInactiveColor}
            inputContainerStyle={[
              styles.removeUnderline,
              styles.centerInputText,
            ]}
            rightIcon={
              <TouchableOpacity
                testID="show-validate-password-icon"
                onPress={() => setShouldShowRptPassword(!shouldShowRptPassword)}
              >
                {shouldShowRptPassword ? (
                  <EyeOn width={20} height={20} fill={"#000"} />
                ) : (
                  <EyeOff width={20} height={20} fill={"#fff"} />
                )}
              </TouchableOpacity>
            }
          />
          <View style={styles.signUpButtonView}>
            <Button
              testID={"submit-button"}
              title="Create"
              activeOpacity={1}
              onPress={() => {
                resetPassword();
              }}
              loading={showLoading}
              loadingProps={{
                size: "small",
                color: "white",
              }}
              disabled={!allValid || password !== passwordValidation}
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
        <View style={styles.passwordValidationWrapper}>
          <PasswordValidationsSection
            password={password}
            setAllValid={setAllValid}
          />
        </View>
        <View style={styles.termsConditionsView}>
          <TermsConditionsPrivacyPolicyLinks navigate={navigation.navigate} />
        </View>
        <View />
      </View>
    );
  };

  return <AuthMainView>{mainContent()}</AuthMainView>;
};
export default ResetPasswordScreen;
