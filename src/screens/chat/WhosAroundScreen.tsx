import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from "react-native";
import Text from "../../components/StyledText";
import Colors from "../../constants/styles/colors";
import ToggleSwitch from "toggle-switch-react-native";
import { CHAT_HISTORY_ROUTE } from "../../constants/routes";
import Geolocation from "react-native-geolocation-service";
import styles from "../../styles/ChatStyles";
import { useSelector, useDispatch } from "react-redux";
import { setWebsocketData } from "../../redux/actions";
import { Auth } from "aws-amplify";
import {
  UpdateWhoIsAroundRequest,
  UPDATE_WHO_IS_AROUND,
} from "../../interfaces";
import { timestampToLocalString } from "../../common/dateUtils";
import { Picker } from "@react-native-picker/picker";
import { IRootReducerType } from "../../redux/reducers";
import CloseSvg from "../../../assets/icons/bottom_navigation/close.svg";
import { useNavigation, useTheme } from "@react-navigation/native";
import LoadingScreen from "../../components/LoadingScreen";

const useShouldRedirect = () => {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const isOnline = useSelector<IRootReducerType, boolean>(
    ({ websocketReducer }) => websocketReducer.isOnline
  );
  const navigation = useNavigation();
  useEffect(() => {
    if (isOnline === true && shouldRedirect) {
      setShouldRedirect(false);
      navigation.navigate(CHAT_HISTORY_ROUTE);
    }
  }, [isOnline, shouldRedirect, navigation]);

  return { setShouldRedirect, isOnline };
};

const CloseIcon = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <TouchableOpacity
      testID={"close-icon"}
      onPress={() => navigation.navigate(CHAT_HISTORY_ROUTE)}
      style={styles.closeIconContainer}
    >
      <CloseSvg
        fill={theme.colors.blackAndWhite}
        style={styles.closeIconStyle}
      />
    </TouchableOpacity>
  );
};

const TextRenderer = ({
  selectedMode,
  onlineUntil,
}: {
  selectedMode: boolean;
  onlineUntil: number;
}) => {
  const theme = useTheme();
  return (
    <View style={styles.whosAroundContainer}>
      {!selectedMode ? (
        <View>
          <Text
            style={{
              ...styles.whosAroundStatusText,
              color: theme.colors.text,
            }}
          >
            Who's around is disabled
          </Text>
          <Text
            style={{
              ...styles.whosAroundParagraph,
              color: theme.colors.text,
            }}
          >
            Turn on to check who's around and chat
          </Text>
          <Text
            style={{
              ...styles.whosAroundParagraph,
              color: theme.colors.text,
            }}
          >
            with your fellow seafarers
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              ...styles.whosAroundStatusText,
              color: theme.colors.text,
            }}
          >
            You are now visible to fellow seafarers around you.
          </Text>
          <Text
            style={{
              ...styles.whosAroundParagraph,
              color: theme.colors.text,
            }}
          >
            You will be active until{" "}
          </Text>
          <Text
            style={{
              ...styles.whosAroundStatusText,
              color: theme.colors.text,
            }}
          >
            {timestampToLocalString(onlineUntil)}
          </Text>
        </View>
      )}
    </View>
  );
};

const WhosAroundScreen = () => {
  const theme = useTheme();
  const logoSize = 100;

  const onlineUntil = useSelector<IRootReducerType, number>(
    ({ websocketReducer }) => websocketReducer.onlineUntil
  );
  const dispatch = useDispatch();
  const [chosenHours, setChosenHours] = useState<string>("0h");
  const [chosenMinutes, setChosenMinutes] = useState<string>("40m");
  const [chosenIndexHours, setChosenIndexHours] = useState<number>(0);
  const [chosenIndexMinutes, setChosenIndexMinutes] = useState<number>(0);
  const [enablingChat, setEnablingChat] = useState<boolean>(false);
  const { isOnline, setShouldRedirect } = useShouldRedirect();
  const geoSuccess = async (position: any) => {
    const user = await Auth.currentUserInfo();
    const minutesOnline = chosenIndexHours * 60 + chosenIndexMinutes;

    const whoIsAroundData =
      isOnline === true
        ? {
            seafarerId: `${user.username}`,
            pin: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          }
        : {
            seafarerId: `${user.username}`,
            pin: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
            onlineUntil: minutesOnline,
          };
    dispatch(
      setWebsocketData({
        messageType: UPDATE_WHO_IS_AROUND,
        payload: whoIsAroundData,
      })
    );
    setEnablingChat(false);
  };

  const geoFailure = async (err: any) => {
    console.error("Error while getting geolocation", err);
    const user = await Auth.currentUserInfo();
    const whoIsAroundData: UpdateWhoIsAroundRequest = {
      seafarerId: `${user.username}`,
      pin: {
        lat: 0,
        lon: 0,
      },
      onlineUntil: 0,
    };
    dispatch(
      setWebsocketData({
        messageType: UPDATE_WHO_IS_AROUND,
        payload: whoIsAroundData,
      })
    );
    Alert.alert(
      "We couldn't get your location at the moment. Please check your settings in order to be online"
    );
    setEnablingChat(false);
  };

  const handleGetGeolocation = async () => {
    setEnablingChat(true);
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );
    } else {
      await Geolocation.requestAuthorization("always");
    }
    Geolocation.getCurrentPosition(geoSuccess, geoFailure, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  };

  const handleToggleSelection = async () => {
    setShouldRedirect(true);
    if (isOnline) {
      const user = await Auth.currentUserInfo();
      const whoIsAroundData: UpdateWhoIsAroundRequest = {
        seafarerId: `${user.username}`,
        pin: {
          lat: 0,
          lon: 0,
        },
        onlineUntil: -1,
      };
      dispatch(
        setWebsocketData({
          messageType: UPDATE_WHO_IS_AROUND,
          payload: whoIsAroundData,
        })
      );
    } else {
      await handleGetGeolocation();
    }
  };

  const renderTimeDropdown = () => {
    const dropDownStyles =
      Platform.OS === "android"
        ? {
            color: "#000",
            style: {
              color: theme.colors.blackAndWhite,
            },
          }
        : { color: theme.colors.text };
    if (!isOnline) {
      return (
        <View style={styles.timeSelectionRow}>
          <View style={styles.spaceView} />
          <View style={styles.pickerView}>
            <Picker
              mode="dropdown"
              selectedValue={chosenHours}
              style={dropDownStyles.style}
              onValueChange={(itemValue) => {
                setChosenHours(`${itemValue}`);
                setChosenIndexHours(Number(itemValue));
              }}
            >
              {["0", "1", "2", "3", "4", "5"].map((hours) => (
                <Picker.Item
                  label={`${hours}h`}
                  color={dropDownStyles.color}
                  value={hours}
                  key={hours}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerView}>
            <Picker
              mode="dropdown"
              selectedValue={chosenMinutes}
              style={dropDownStyles.style}
              onValueChange={(itemValue) => {
                setChosenMinutes(`${itemValue}`);
                setChosenIndexMinutes(Number(itemValue));
              }}
            >
              {["00", "30"].map((minutes) => (
                <Picker.Item
                  key={minutes}
                  color={dropDownStyles.color}
                  label={`${minutes}m`}
                  value={minutes}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.spaceView} />
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}
      scrollEnabled={false}
    >
      {enablingChat ? (
        <View style={styles.root}>
          <LoadingScreen logoWidthSize={logoSize} logoHeightSize={logoSize} />
        </View>
      ) : (
        <>
          <CloseIcon />
          <View style={styles.isOnlineView}>
            <View>
              {
                <TextRenderer
                  onlineUntil={onlineUntil}
                  selectedMode={isOnline}
                />
              }
            </View>
            <View style={styles.toggleContainer}>
              <ToggleSwitch
                data-testid={"toggle"}
                isOn={isOnline}
                onColor={Colors.marlowBlue}
                offColor={Colors.grey}
                size="large"
                onToggle={handleToggleSelection}
              />
            </View>
            <View>{renderTimeDropdown()}</View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default WhosAroundScreen;
