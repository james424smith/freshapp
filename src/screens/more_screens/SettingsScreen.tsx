import React, { useState, useEffect } from "react";
import { View, Alert, AppState } from "react-native";
import Text from "../../components/StyledText";
import styles from "../../styles/more_screens/SettingsStyles";
import DeviceInfo from "react-native-device-info";
import { version } from "../../../package.json";
import { useTheme } from "@react-navigation/native";
import FingerprintScanner, {
  Biometrics,
} from "react-native-fingerprint-scanner";
import AsyncStorage from "@react-native-community/async-storage";
import BiometricLoginSwitch from "../../components/bioSettingsScreen/BiometricLoginSwitch";
import AppColorScheme from "../../components/settingsScreen/AppColorScheme";
import DarkModeChangeModal from "../../components/settingsScreen/DarkModeChangeModal";
import valueOrDefault from "../../common/valueOrDefault";

const SettingsScreen = () => {
  const versionOfApp = DeviceInfo.getVersion();
  const javascriptVersionOfApp = version;
  const versionOfAppText = "Marlow CrewCompanion";
  const theme = useTheme();

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [
    isFetchedBiometricToggle,
    setIsFetchedBiometricToggle,
  ] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [biometryType, setBiometryType] = useState<Biometrics | string>("");

  useEffect(() => {
    if (!isFetchedBiometricToggle) {
      fetchBiometricToggleFromStore();
    } else {
      triggerBiometricToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled, isFetchedBiometricToggle]);

  async function fetchBiometricToggleFromStore() {
    const getSwitchValue = valueOrDefault(
      await AsyncStorage.getItem("isBiometricEnabled"),
      ""
    ) as string;
    const switchValue = getSwitchValue ? JSON.parse(getSwitchValue) : false;
    setIsEnabled(switchValue);
    isBiometricAbleToUse();
  }

  async function triggerBiometricToggle() {
    if (isEnabled) {
      setBiometricLogin();
    } else {
      FingerprintScanner.release();
    }
    await AsyncStorage.setItem("isBiometricEnabled", isEnabled.toString());
  }

  const customAlert = () =>
    Alert.alert(
      "Authentication was cancelled",
      "Please try again",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "default",
        },
      ],
      { cancelable: false }
    );

  function setBiometricLogin() {
    FingerprintScanner.authenticate({
      title: "Biometric Login",
      description: `Please use ${biometryType} to log in without password.`,
    }).catch((error) => {
      setIsEnabled(false);
      if (error) {
        customAlert();
      }
    });
  }

  useEffect(() => {
    AppState.addEventListener("change", async () => {
      if (AppState.currentState === "active") {
        await isBiometricAbleToUse();
      }
    });
    return () => {
      AppState.removeEventListener("change", () => {});
    };
  }, []);

  async function isBiometricAbleToUse() {
    FingerprintScanner.isSensorAvailable()
      .then((type) => {
        setBiometryType(type);
      })
      .catch((e) => {
        setBiometryType("");
        console.log(e);
      });
  }

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    setIsFetchedBiometricToggle(true);
  };

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.rootContainer}>
      {biometryType ? (
        <BiometricLoginSwitch
          toggleSwitch={toggleSwitch}
          isEnabled={isEnabled}
        />
      ) : null}
      <AppColorScheme changeModalVisible={changeModalVisible} />
      <View style={styles.textContainer}>
        <Text style={{ ...styles.title, color: theme.colors.text }}>
          {versionOfAppText}
        </Text>
        <Text style={styles.versionNumber}>
          Version: {versionOfApp} (J-{javascriptVersionOfApp})
        </Text>
      </View>
      <DarkModeChangeModal
        modalVisible={modalVisible}
        changeModalVisible={changeModalVisible}
      />
    </View>
  );
};

export default SettingsScreen;
