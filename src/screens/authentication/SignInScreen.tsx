import React, { useState, useEffect } from "react";
import TermsConditionsPrivacyPolicyLinks from "../../components/termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import { Auth, Analytics } from "aws-amplify";
import { Button, CheckBox, Input } from "react-native-elements";
import { View, Alert, Platform, TouchableOpacity } from "react-native";
import styles from "../../styles/AuthStyles";
import AsyncStorage from "@react-native-community/async-storage";
import {
  FORCE_UPDATE_PASSWORD_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
  PASSCODE_ROUTE,
} from "../../constants/routes";
import Text from "../../components/StyledText";
import Colors from "../../constants/styles/colors";
import errorHandling from "../../common/errorHandling";
import { IOS } from "../../constants/Platforms";
import DeviceInfo from "react-native-device-info";
import { version } from "../../../package.json";
import {
  useNavigation,
  StackActions,
  useTheme,
} from "@react-navigation/native";
import EyeOff from "../../../assets/icons/eye-off.svg";
import EyeOn from "../../../assets/icons/eye-on.svg";
import InputElement from "../../components/Input";
import valueOrDefault from "../../common/valueOrDefault";
import AuthMainView from "../../components/authentication/AuthMainView";
import ExitButton from "../../components/authentication/ExitButton";

const useEmployeeIdFromStorage = () => {
  const [shouldSaveEmployeeId, setShouldSaveEmployeeId] = useState<boolean>(
    false
  );
  const [employeeId, setEmployeeId] = useState<string>("");
  useEffect(() => {
    AsyncStorage.getItem("shouldSaveEmployeeId").then((e) => {
      setShouldSaveEmployeeId(e === "true");
    });
    AsyncStorage.getItem("employeeId").then((e) => {
      setEmployeeId(valueOrDefault(e, "") as string);
    });
  }, []);
  return {
    employeeId,
    setEmployeeId,
    shouldSaveEmployeeId,
    setShouldSaveEmployeeId,
  };
};

const SignInScreen = () => {
  const theme = useTheme();
  const passwordInput = React.useRef<Input | null>(null);
  const {
    employeeId,
    setEmployeeId,
    shouldSaveEmployeeId,
    setShouldSaveEmployeeId,
  } = useEmployeeIdFromStorage();
  const [password, setPassword] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);
  const navigation = useNavigation();

  const handlePressCheckbox = async () => {
    const nextShouldSaveEmployeeId = !shouldSaveEmployeeId;
    setShouldSaveEmployeeId(!shouldSaveEmployeeId);
    await AsyncStorage.setItem(
      "shouldSaveEmployeeId",
      `${nextShouldSaveEmployeeId}`
    );
    if (nextShouldSaveEmployeeId) {
      employeeId && (await AsyncStorage.setItem("employeeId", employeeId));
    } else {
      await AsyncStorage.removeItem("employeeId");
    }
  };

  useEffect(() => {
    if (passwordInput.current) {
      passwordInput.current.setNativeProps({
        style: { ...styles.inputValueStyle, color: theme.colors.text },
      });
    }
  }, [theme]);
  const signIn = async () => {
    setShowLoading(true);

    const user = await Auth.signIn(employeeId, password, {
      deviceId: valueOrDefault(
        await AsyncStorage.getItem("deviceToken"),
        "ba6390f1b57c403e96e7a2d283d5b302"
      ) as string,
      platform: Platform.OS === IOS ? "ios" : "android",
      osVersion: DeviceInfo.getVersion(),
      jsVersion: version,
    });

    await Analytics.updateEndpoint({
      userId: user.username,
      address: await AsyncStorage.getItem("deviceToken"),
      ChannelType: Platform.OS === IOS ? "APNS" : "GCM",
    }).catch((a) => a);

    const signinPath = await AsyncStorage.getItem("SIGN_IN_PATH");

    if (signinPath !== "SIGN_IN") {
      await AsyncStorage.setItem("SIGN_IN_PATH", "SIGN_IN");
    }

    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      setShowLoading(false);
      navigation.navigate(FORCE_UPDATE_PASSWORD_ROUTE, { user });
    } else {
      setShowLoading(false);
      navigation.dispatch(
        StackActions.replace("Auth", { screen: PASSCODE_ROUTE })
      );
    }
  };

  const mainContent = () => {
    return (
      <View style={styles.signUpView}>
        <View style={styles.signUpInput}>
          <ExitButton path={"SWIPE"} containerStyles={styles.skipContainer} />
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>CrewCompanion</Text>
          </View>

          <View style={styles.signUpCredentialsContainer}>
            <InputElement
              testID={"employee-id-input"}
              containerStyle={{
                ...styles.inputBoxStyle,
                backgroundColor: theme.colors.colorInputText,
              }}
              onChangeText={(newEmployeeId: string) => {
                setEmployeeId(newEmployeeId);
                shouldSaveEmployeeId &&
                  AsyncStorage.setItem(
                    "employeeId",
                    newEmployeeId
                  ).then(() => {});
              }}
              value={employeeId}
              inputStyle={{
                ...styles.inputValueStyle,
                color: theme.colors.text,
              }}
              keyboardAppearance="light"
              placeholder="Employee ID"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInput.current && passwordInput.current.focus();
              }}
              blurOnSubmit={false}
              placeholderTextColor={Colors.FAQInactiveColor}
              inputContainerStyle={styles.removeUnderline}
              shouldUseFocusedStyles={true}
            />
            <CheckBox
              checked={shouldSaveEmployeeId}
              onPress={handlePressCheckbox}
              containerStyle={styles.checkBoxContainerStyle}
              title={
                <Text
                  style={{
                    color: theme.colors.rememberPasswordBoxText,
                  }}
                >
                  Remember my employee id
                </Text>
              }
            />
            <InputElement
              testID={"password-input"}
              containerStyle={{
                ...styles.inputBoxStyle,
                backgroundColor: theme.colors.colorInputText,
              }}
              secureTextEntry={!shouldShowPassword}
              onChangeText={(newPassword: string) => setPassword(newPassword)}
              value={password}
              inputStyle={{
                ...styles.inputValueStyle,
                color: theme.colors.text,
              }}
              keyboardAppearance="light"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="default"
              ref={passwordInput}
              blurOnSubmit={true}
              placeholderTextColor={Colors.FAQInactiveColor}
              inputContainerStyle={[
                styles.removeUnderline,
                styles.centerInputText,
              ]}
              shouldUseFocusedStyles={true}
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
            <View style={styles.signInButtonView}>
              <Button
                testID={"sign-in-button"}
                title="Sign in"
                activeOpacity={1}
                onPress={async () => {
                  await signIn().catch(() => {
                    setShowLoading(false);
                    Alert.alert("Login Failed: ", errorHandling("Login"), [
                      {
                        text: "Retry",
                      },
                    ]);
                  });
                }}
                loading={showLoading}
                loadingProps={{
                  size: "small",
                  color: Colors.white,
                }}
                disabled={password.length < 8}
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
                titleStyle={[
                  styles.textOnButton,
                  password.length < 8 ? {} : styles.textOnButton,
                ]}
              />
              <Button
                testID={"sigu-up-button"}
                buttonStyle={styles.linkStyle}
                title="Create new account"
                activeOpacity={0.5}
                titleStyle={styles.signUpLink}
                onPress={() => navigation.navigate(SIGN_UP_ROUTE)}
              />

              <Button
                testID={"forgot-password-button"}
                buttonStyle={styles.linkStyle}
                title="Forgot password?"
                activeOpacity={0.5}
                titleStyle={{
                  ...styles.forgotPasswordLink,
                  color: theme.colors.forgotPasswordLink,
                }}
                onPress={() => navigation.navigate(FORGOT_PASSWORD_ROUTE)}
              />
            </View>
            <View style={styles.termsConditionsView}>
              <TermsConditionsPrivacyPolicyLinks
                navigate={navigation.navigate}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return <AuthMainView>{mainContent()}</AuthMainView>;
};
export default SignInScreen;
