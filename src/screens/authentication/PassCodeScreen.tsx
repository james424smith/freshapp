import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Vibration,
  Alert,
  ImageBackgroundProps,
} from "react-native";
import { Auth } from "aws-amplify";
import { MAIN_APP_SCREEN_ROUTE, SIGN_IN_ROUTE } from "../../constants/routes";
import styles from "../../styles/PassCodeStyles";
import { Icon } from "react-native-elements";
import Colors from "../../constants/styles/colors";
import Text from "../../components/StyledText";
import background from "../../../assets/images/ic_nextjob_bg.png";
import AsyncStorage from "@react-native-community/async-storage";
import {
  useNavigation,
  StackActions,
  NavigationAction,
} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearAllState } from "../../redux/actions";
import { handleSignOut } from "../../common/pushNotifications";
import FingerprintScanner from "react-native-fingerprint-scanner";
import AwsCustomStorage from "../../common/AwsCustomStorage";
import valueOrDefault from "../../common/valueOrDefault";
import moment from "moment";
interface LockValue {
  value: number | null;
}
type PasscodeNumber = { number: number };
type PasscodeExtra = { extra: string };
type PasscodeType = { type: string };
type PasscodeNumbers = PasscodeNumber | PasscodeExtra | PasscodeType;
const numbers: PasscodeNumbers[] = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
  { number: 7 },
  { number: 8 },
  { number: 9 },
  { extra: "extra" },
  { number: 0 },
  { type: "biometric" },
];
interface FlatListType<T> {
  item: T;
}
const usePasscode = () => {
  const [inputPasscode, setInputPasscode] = useState<LockValue[]>([
    { value: null },
    { value: null },
    { value: null },
    { value: null },
  ]);
  return { inputPasscode, setInputPasscode };
};
const useRedirect = (redirect = false) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (redirect) {
      navigation.dispatch(
        StackActions.replace("App", { screen: MAIN_APP_SCREEN_ROUTE })
      );
    }
  }, [redirect, navigation]);
};

const alertTitle = "Warning!";
const alertMsg =
  "Forgot passcode will reset your current passcode.  Logging in again will require an active Internet connection. Proceed?";

function PassCodeRender({ item }: { item: LockValue }) {
  return item.value !== null ? (
    <View style={styles.filledCircle} />
  ) : (
    <View style={styles.emptyCircle} />
  );
}

const convertPasscode = (inputPasscode: LockValue[]) => {
  const passCode = inputPasscode.map((input) => input.value).join("");
  return parseInt(passCode, 10);
};

async function setUserPasscode(
  dispatch: (action: NavigationAction) => void,
  inputPasscode: LockValue[]
) {
  const convertedPasscode = convertPasscode(inputPasscode);
  const currentUser = await Auth.currentUserInfo();
  const passCodeData = {
    passCode: convertedPasscode,
    isUserSetPassCode: true,
  };
  await AwsCustomStorage.setItem(
    currentUser.username,
    JSON.stringify(passCodeData)
  );
  Alert.alert(
    "Passcode Saved Successful",
    "Your can login with passcode now.",
    [
      {
        text: "Ok",
        onPress: () => {
          dispatch(
            StackActions.replace("App", { screen: MAIN_APP_SCREEN_ROUTE })
          );
        },
      },
    ]
  );
}

let interval: any;
let cnt = 120;

const PassCodeScreen = () => {
  const { inputPasscode, setInputPasscode } = usePasscode();
  const [filledCount, setFilledCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [biometric, setBiometric] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [wrongTypeCount, setWrongTypeCount] = useState<number>(0);
  const [isKeypadEnable, setKeypadEnable] = useState<boolean>(true);
  const [countDownNum, setCountDownNum] = useState<string>("02:00");
  const [wrongPasscode, setWrongPasscode] = useState<boolean>(false);

  const navigation = useNavigation();
  useRedirect(redirect);
  const dispatch = useDispatch();

  const asyncBiometricLogin = async () => {
    await FingerprintScanner.authenticate({})
      .then(() => setRedirect(true))
      .catch(() => {
        setRedirect(false);
      });
    FingerprintScanner.release();
  };

  function _renderNumbers({ item }: FlatListType<PasscodeNumbers>) {
    if ((item as PasscodeExtra).extra && (biometric || filledCount > 0)) {
      return (
        <TouchableOpacity style={[styles.numberButton]}>
          <Text style={[styles.numberText]} />
        </TouchableOpacity>
      );
    } else if ((item as PasscodeType).type && (biometric || filledCount > 0)) {
      if (filledCount > 0) {
        return (
          <TouchableOpacity
            testID={"delete-button"}
            style={[styles.numberButton]}
            onPress={() => deletePasscode()}
          >
            <Icon name="backspace" color={Colors.white} size={35} />
          </TouchableOpacity>
        );
      } else if (biometric) {
        return (
          <TouchableOpacity
            testID={"biometric-button"}
            style={[styles.numberButton]}
            onPress={asyncBiometricLogin}
          >
            <Icon name="fingerprint" color={Colors.white} size={50} />
          </TouchableOpacity>
        );
      }
    } else if (
      (item as PasscodeNumber).number ||
      (item as PasscodeNumber).number === 0
    ) {
      return (
        <TouchableOpacity
          testID={"number-button"}
          style={styles.numberButton}
          disabled={!isKeypadEnable}
          onPress={() => fillPasscode(item)}
        >
          <Text
            style={[styles.numberText, { opacity: isKeypadEnable ? 1 : 0.5 }]}
          >
            {(item as PasscodeNumber).number}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  const deletePasscode = () => {
    inputPasscode[filledCount - 1].value = null;
    setFilledCount(filledCount - 1);
  };

  const fillPasscode = (item: PasscodeNumbers) => {
    let isFieldFilled = false;
    setFilledCount(filledCount + 1);
    const newArr = inputPasscode.map((input: any) => {
      if (input.value === null && !isFieldFilled) {
        isFieldFilled = true;
        return { value: (item as PasscodeNumber).number };
      }
      return { value: input.value };
    });
    setInputPasscode(newArr);
  };

  useEffect(() => {
    const chooseMessageInformation = async () => {
      await changeMessageInformation();
    };
    chooseMessageInformation();
  }, []);

  useEffect(() => {
    if (filledCount === 4) {
      checkPasscode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filledCount]);

  async function changeMessageInformation() {
    const currentUser = await Auth.currentUserInfo();
    const isAvailable = await FingerprintScanner.isSensorAvailable().catch(
      (e) => console.log(e)
    );
    const biometricValue = valueOrDefault(
      await AsyncStorage.getItem("isBiometricEnabled"),
      ""
    ) as string;
    const isBiometricEnabled = biometricValue && JSON.parse(biometricValue);
    const passCodeDataFromKeychain = valueOrDefault(
      AwsCustomStorage.getItem(currentUser.username),
      ""
    ) as string;
    const passCodeData =
      passCodeDataFromKeychain && JSON.parse(passCodeDataFromKeychain);
    if (isAvailable) {
      setBiometric(isBiometricEnabled);
    } else {
      setBiometric(false);
    }

    if (passCodeData && passCodeData.isUserSetPassCode) {
      setMessage("Please enter your passcode");
    } else {
      setMessage("Please set your passcode");
    }
  }
  async function checkPasscode() {
    const currentUser = await Auth.currentUserInfo();
    const passCodeDataFromKeychain = valueOrDefault(
      AwsCustomStorage.getItem(currentUser.username),
      ""
    ) as string;
    const passCodeData = passCodeDataFromKeychain
      ? JSON.parse(passCodeDataFromKeychain)
      : null;
    if (passCodeData && passCodeData.isUserSetPassCode) {
      checkUserPasscode();
    } else {
      setUserPasscode(navigation.dispatch, inputPasscode);
    }
  }
  async function checkUserPasscode() {
    const currentUser = await Auth.currentUserInfo();
    const passCodeDataFromKeychain = valueOrDefault(
      AwsCustomStorage.getItem(currentUser.username),
      ""
    ) as string;
    const passCodeData = passCodeDataFromKeychain
      ? JSON.parse(passCodeDataFromKeychain)
      : null;
    const convertedPasscode = convertPasscode(inputPasscode);
    if (convertedPasscode === passCodeData.passCode) {
      navigation.dispatch(
        StackActions.replace("App", { screen: MAIN_APP_SCREEN_ROUTE })
      );
    } else {
      setInputPasscode([
        { value: null },
        { value: null },
        { value: null },
        { value: null },
      ]);
      setFilledCount(0);
      Vibration.vibrate(200);
      setMessage("Wrong password");
      setWrongTypeCount(wrongTypeCount + 1);
      if (wrongPasscode || wrongTypeCount + 1 > 4) {
        startCountDown();
      }
    }
  }

  const startCountDown = () => {
    setUntilLockedToStore();
    setKeypadEnable(false);
  };

  async function setUntilLockedToStore() {
    const currentTime = moment();
    await AwsCustomStorage.setItem("untilLocked", JSON.stringify(currentTime));
    await AwsCustomStorage.setItem("passcodeFlag", JSON.stringify(true));
  }

  async function getUntilLockedFromStore() {
    const untilLockedFromStore = valueOrDefault(
      await AwsCustomStorage.getItem("untilLocked"),
      ""
    ) as string;
    const wrongPasscodeFlg = valueOrDefault(
      await AwsCustomStorage.getItem("passcodeFlag"),
      "false"
    ) as string;
    setWrongPasscode(JSON.parse(wrongPasscodeFlg));
    const untilLocked = moment(
      untilLockedFromStore && JSON.parse(untilLockedFromStore)
    );
    const currentTime = moment();
    const diff = currentTime.diff(untilLocked, "seconds");
    if (diff < 120) {
      cnt = 120 - diff;
      setCountDownNum(moment.utc(cnt * 1000).format("mm:ss"));
      setKeypadEnable(false);
    }
  }

  useEffect(() => {
    getUntilLockedFromStore();
  }, []);

  useEffect(() => {
    if (!isKeypadEnable) {
      interval = setInterval(() => {
        --cnt;
        setCountDownNum(moment.utc(cnt * 1000).format("mm:ss"));
        if (cnt === 0) {
          clearInterval(interval);
          setKeypadEnable(true);
          setCountDownNum("02:00");
          setWrongTypeCount(0);
          setWrongPasscode(true);
          cnt = 120;
        }
      }, 1000);
    }
  }, [isKeypadEnable]);

  return (
    <ImageBackground
      source={(background as unknown) as ImageBackgroundProps}
      style={styles.imageBackground}
    >
      <View style={styles.mainViewStyle}>
        <View style={styles.swipeToUnlockView}>
          <Icon name="lock" color={Colors.white} />
          <Text style={styles.swipeToUnlockText}>{message}</Text>
        </View>
        <View style={styles.enterPasscodeView}>
          <Text style={styles.enterPasscodeText}>Enter Passcode</Text>
          <View style={styles.circleView}>
            <FlatList
              data={inputPasscode}
              renderItem={(props) => <PassCodeRender {...props} />}
              contentContainerStyle={styles.passcodeRender}
              keyExtractor={(_item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={styles.countDownView}>
          <Text
            style={[styles.countDownText, { opacity: isKeypadEnable ? 0 : 1 }]}
          >
            {"Too many attempts. Please try again in " + countDownNum}
          </Text>
        </View>
        <View style={styles.numbersView}>
          <FlatList
            numColumns={3}
            columnWrapperStyle={styles.row}
            data={numbers}
            renderItem={_renderNumbers}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
        <View style={styles.forgotPasswordView}>
          <TouchableOpacity
            testID={"forgot-password"}
            onPress={() => {
              Alert.alert(
                alertTitle,
                alertMsg,
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: async () => {
                      const user = await Auth.currentUserInfo();
                      await AwsCustomStorage.removeItem(user.username);
                      handleSignOut(false)
                        .then(() => {
                          dispatch(clearAllState());
                          navigation.dispatch(
                            StackActions.replace("Auth", {
                              screen: SIGN_IN_ROUTE,
                            })
                          );
                        })
                        .catch(() => {});
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <Text style={styles.forgotPasswordText}>Forgot Passcode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default PassCodeScreen;
