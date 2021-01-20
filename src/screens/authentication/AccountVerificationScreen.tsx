import React, { useEffect, useState } from "react";
import TermsConditionsPrivacyPolicyLinks from "../../components/termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import { View, TouchableOpacity } from "react-native";
import Text from "../../components/StyledText";
import { Button, Input } from "react-native-elements";
import InputElement from "../../components/Input";
import styles from "../../styles/AuthStyles";
import { RESET_PASSWORD_ROUTE } from "../../constants/routes";
import Colors from "../../constants/styles/colors";
import { RouteProp, useNavigation, useTheme } from "@react-navigation/native";
import EyeOff from "../../../assets/icons/eye-off.svg";
import EyeOn from "../../../assets/icons/eye-on.svg";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthStackParamList } from "../../navigation/AppNavigator";
import ExitButton from "../../components/authentication/ExitButton";
import AuthMainView from "../../components/authentication/AuthMainView";

interface Props {
  route: RouteProp<AuthStackParamList, "AccountVerification">;
}
const AccountVerificationScreen = (props: Props) => {
  const codeInput = React.useRef<Input | null>(null);
  const theme = useTheme();
  const [employeeId, setEmployeeId] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);
  const { route } = props;
  const errorMessage = route.params?.verificationError;

  useEffect(() => {
    getEmployeeIdFromStorage();
  }, []);

  const getEmployeeIdFromStorage = async () => {
    const storageEmployeeId = (await AsyncStorage.getItem("employeeID")) || "";
    setEmployeeId(storageEmployeeId);
  };

  const renderErrorMessage = () => {
    if (errorMessage) {
      return (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>
      );
    }
    return null;
  };

  const mainContent = () => {
    return (
      <View style={styles.resetPasswordLayout}>
        <ExitButton path={"SIGN_IN"} />
        <View />
        <View style={styles.resetForgotPasswordTitleContainer}>
          <Text style={styles.resetPasswordText}>Account verification</Text>
        </View>
        <View style={styles.forgotPasswordCredentialsContainer}>
          <View>
            <Text
              style={{
                ...styles.accountVerificationEmployeeText,
                color: theme.colors.accountVerificationID,
              }}
            >
              Employee ID
            </Text>
          </View>
          <InputElement
            testID={"employee-id-input"}
            containerStyle={{
              ...styles.inputBoxStyle,
              backgroundColor: theme.colors.colorInputText,
            }}
            onChangeText={(newEmployeeId: string) =>
              setEmployeeId(newEmployeeId)
            }
            onSubmitEditing={() => {
              codeInput.current && codeInput.current.focus();
            }}
            value={employeeId}
            inputStyle={styles.inputValueStyle}
            keyboardAppearance="light"
            placeholder="Employee ID"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            returnKeyType="default"
            blurOnSubmit={false}
            placeholderTextColor={Colors.FAQInactiveColor}
            inputContainerStyle={styles.removeUnderline}
            shouldUseFocusedStyles={true}
            disabled={true}
          />
          <InputElement
            testID={"code-input"}
            containerStyle={{
              ...styles.inputBoxStyle,
              backgroundColor: theme.colors.colorInputText,
            }}
            secureTextEntry={!shouldShowPassword}
            onChangeText={(newCode: string) => setCode(newCode)}
            value={code}
            inputStyle={styles.inputValueStyle}
            keyboardAppearance="light"
            placeholderTextColor={Colors.FAQInactiveColor}
            placeholder="Email Verification code "
            autoCapitalize="none"
            inputContainerStyle={[
              styles.removeUnderline,
              styles.centerInputText,
            ]}
            autoCorrect={false}
            keyboardType="numeric"
            returnKeyType="next"
            ref={codeInput}
            shouldUseFocusedStyles={true}
            blurOnSubmit={false}
            rightIcon={
              <TouchableOpacity
                testID={"show-password-icon"}
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
          {renderErrorMessage()}
          <View style={styles.cancelLinkContainer}>
            <Button
              testID={"submit-button"}
              title="Next"
              activeOpacity={1}
              onPress={() => {
                setShowLoading(false);
                navigation.navigate(RESET_PASSWORD_ROUTE, {
                  employeeId,
                  verificationCode: code,
                });
              }}
              loading={showLoading}
              buttonStyle={{
                ...styles.signUpButton,
                backgroundColor: theme.colors.signInButtonColor,
              }}
              loadingProps={{
                size: "small",
                color: Colors.white,
              }}
              disabled={!employeeId || !code}
              disabledStyle={{
                backgroundColor: theme.colors.DisableSignInButtonColor,
              }}
              titleStyle={styles.textOnButton}
              disabledTitleStyle={{
                color: theme.colors.whiteAndBlack,
              }}
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
export default AccountVerificationScreen;
