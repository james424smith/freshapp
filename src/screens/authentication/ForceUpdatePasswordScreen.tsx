import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Input, Button } from "react-native-elements";
import { View, Alert, TouchableOpacity } from "react-native";
import Text from "../../components/StyledText";
import styles from "../../styles/AuthStyles";
import TermsConditionsPrivacyPolicyLinks from "../../components/termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import Colors from "../../constants/styles/colors";
import errorHandling from "../../common/errorHandling";
import {
  RouteProp,
  useNavigation,
  StackActions,
  useTheme,
} from "@react-navigation/native";
import InputElement from "../../components/Input";

import { AuthStackParamList } from "../../navigation/AppNavigator";
import ExitButton from "../../components/authentication/ExitButton";
import EyeOff from "../../../assets/icons/eye-off.svg";
import EyeOn from "../../../assets/icons/eye-on.svg";
import AuthMainView from "../../components/authentication/AuthMainView";
import PasswordValidationsSection from "../../components/authentication/PasswordValidationsSection";

interface Props {
  route: RouteProp<AuthStackParamList, "ForceUpdatePassword">;
}

export default (props: Props) => {
  const passwordValidationRef = React.useRef<Input | null>(null);
  const newPasswordInput = React.useRef<Input | null>(null);
  const theme = useTheme();
  const [password, setPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const [allValid, setAllValid] = useState<boolean>(false);

  const { route } = props;
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);
  const [shouldShowRptPassword, setShouldShowRptPassword] = useState<boolean>(
    false
  );
  const forceResetPassword = async () => {
    setShowLoading(true);
    const user = route.params?.user;
    await Auth.completeNewPassword(user, password, []);
    setShowLoading(false);
    navigation.dispatch(StackActions.replace("Auth", { screen: "SignIn" }));
  };

  useEffect(() => {
    if (newPasswordInput.current) {
      newPasswordInput.current.setNativeProps({
        style: { ...styles.inputValueStyle, color: theme.colors.text },
      });
    }
    if (passwordValidationRef.current) {
      passwordValidationRef.current.setNativeProps({
        style: { ...styles.inputValueStyle, color: theme.colors.text },
      });
    }
  }, [theme]);
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
            testID={"new-pasword-input"}
            containerStyle={{
              ...styles.inputBoxStyleForgotPassword,
              backgroundColor: theme.colors.colorInputText,
            }}
            inputStyle={styles.inputValueStyle}
            onChangeText={(newPassword) => setPassword(newPassword)}
            secureTextEntry={!shouldShowPassword}
            value={password}
            ref={newPasswordInput}
            keyboardAppearance="light"
            placeholder="New password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholderTextColor={Colors.FAQInactiveColor}
            onSubmitEditing={() => {
              passwordValidationRef.current &&
                passwordValidationRef.current.focus();
            }}
            inputContainerStyle={[
              styles.removeUnderline,
              styles.centerInputText,
            ]}
            blurOnSubmit={false}
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
            containerStyle={{
              ...styles.inputBoxStyleForgotPassword,
              backgroundColor: theme.colors.colorInputText,
            }}
            testID={"validate-pasword-input"}
            onChangeText={(newPasswordValidation) =>
              setPasswordValidation(newPasswordValidation)
            }
            inputStyle={styles.inputValueStyle}
            value={passwordValidation}
            shouldUseFocusedStyles={true}
            secureTextEntry={!shouldShowRptPassword}
            keyboardAppearance="light"
            placeholder="Repeat new password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="default"
            ref={passwordValidationRef}
            placeholderTextColor={Colors.FAQInactiveColor}
            blurOnSubmit={false}
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
            inputContainerStyle={[
              styles.removeUnderline,
              styles.centerInputText,
            ]}
          />
          <View style={styles.signUpButtonView}>
            <Button
              title="Create"
              testID={"submit-button"}
              activeOpacity={1}
              onPress={async () => {
                await forceResetPassword().catch(() => {
                  setShowLoading(false);
                  Alert.alert(
                    "Error when updating password: ",
                    errorHandling("Login")
                  );
                });
              }}
              loading={showLoading}
              loadingProps={{
                size: "small",
                color: "white",
              }}
              disabledStyle={{
                backgroundColor: theme.colors.DisableSignInButtonColor,
              }}
              disabled={!allValid || password !== passwordValidation}
              buttonStyle={{
                ...styles.signUpButton,
                backgroundColor: theme.colors.signInButtonColor,
              }}
              titleStyle={styles.textOnButton}
              disabledTitleStyle={{
                color: theme.colors.whiteAndBlack,
              }}
            />
          </View>
        </View>
        <View style={styles.passwordValidationWrapper}>
          <PasswordValidationsSection
            setAllValid={setAllValid}
            password={password}
          />
        </View>
        <View style={styles.termsConditionsView}>
          <TermsConditionsPrivacyPolicyLinks navigate={navigation.navigate} />
        </View>
      </View>
    );
  };

  return <AuthMainView>{mainContent()}</AuthMainView>;
};
