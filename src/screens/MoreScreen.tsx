import React, { useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Text from "../components/StyledText";
import { routes } from "../navigation/MoreScreenNavigation";
import styles, {
  mainIconSize,
  smallIconSize,
} from "../styles/MoreScreenStyles";
import Profile from "../../assets/icons/more_screen/004-sailor.svg";
import Salary from "../../assets/icons/more_screen/050-chest.svg";
import ServiceRecords from "../../assets/icons/more_screen/009-cardinal points.svg";
import ServiceRecordsDark from "../../assets/icons/more_screen/darkcardinalpoint.svg";
import WorkClothes from "../../assets/icons/more_screen/023-captain.svg";
import News from "../../assets/icons/more_screen/034-message in a bottle.svg";
import Contact from "../../assets/icons/more_screen/002-compass.svg";
import Documents from "../../assets/icons/more_screen/018-map.svg";
import Anchor from "../../assets/icons/more_screen/008-anchor.svg";
import AnchorDark from "../../assets/icons/more_screen/darkanchor.svg";
import Support from "../../assets/icons/more_screen/017-lifesaver.svg";
import CrewPortal from "../../assets/icons/more_screen/036-porthole.svg";
import Covid from "../../assets/icons/more_screen/covid-19.svg";
import SettingsIcon from "../../assets/icons/more_screen/settings.svg";
import LogOutIcon from "../../assets/icons/logout.svg";
import { handleSignOut } from "../common/pushNotifications";
const alertTitle = "Warning!";
const alertMsg =
  "Logging out will delete any personal data stored in the App/Device.  Logging in again will require an active Internet connection. Proceed?";

import {
  NEWS_ROUTE,
  PROFILE_ROUTE,
  SALARY_ROUTE,
  SEA_SERVICE_RECORDS_ROUTE,
  WORKING_CLOTHES_ROUTE,
  DOCUMENTS_ROUTE,
  IMPRINT_ROUTE,
  CONTACT_ROUTE,
  SUPPORT_ROUTE,
  CREW_PORTAL_ROUTE,
  SIGN_IN_ROUTE,
  COVID_DOCUMENT_ROUTE,
  SETTINGS_ROUTE,
} from "../constants/routes";
import { useDispatch } from "react-redux";
import { clearAllState } from "../redux/actions";
import {
  useNavigation,
  StackActions,
  useTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

const MoreScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const scheme = useColorScheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutContainer}
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
                  onPress: () =>
                    handleSignOut(false)
                      .then(() => {
                        dispatch(clearAllState());
                        navigation.dispatch(
                          StackActions.replace("Auth", {
                            screen: SIGN_IN_ROUTE,
                          })
                        );
                      })
                      .catch(() => {}),
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <LogOutIcon
            width={mainIconSize}
            height={mainIconSize}
            fill={theme.colors.blackAndWhite}
          />
        </TouchableOpacity>
      ),
    });
  }, [dispatch, navigation, theme.colors]);

  const handleLink = async (route: string) => Linking.openURL(route);

  function darkModeIconSeaService() {
    if (scheme === "dark") {
      return <ServiceRecordsDark width={mainIconSize} height={mainIconSize} />;
    } else {
      return <ServiceRecords width={mainIconSize} height={mainIconSize} />;
    }
  }
  function darkModeIconAnchor() {
    if (scheme === "dark") {
      return <AnchorDark width={mainIconSize} height={mainIconSize} />;
    } else {
      return <Anchor width={mainIconSize} height={mainIconSize} />;
    }
  }

  const chooseIconToUse = (name: string) => {
    switch (name) {
      case PROFILE_ROUTE:
        return <Profile width={mainIconSize} height={mainIconSize} />;
      case SALARY_ROUTE:
        return <Salary width={smallIconSize} height={smallIconSize} />;
      case SEA_SERVICE_RECORDS_ROUTE:
        return darkModeIconSeaService();
      case WORKING_CLOTHES_ROUTE:
        return <WorkClothes width={mainIconSize} height={mainIconSize} />;
      case DOCUMENTS_ROUTE:
        return <Documents width={mainIconSize} height={mainIconSize} />;
      case NEWS_ROUTE:
        return <News width={mainIconSize} height={mainIconSize} />;
      case IMPRINT_ROUTE:
        return darkModeIconAnchor();
      case CONTACT_ROUTE:
        return <Contact width={mainIconSize} height={mainIconSize} />;
      case SUPPORT_ROUTE:
        return <Support width={mainIconSize} height={mainIconSize} />;
      case CREW_PORTAL_ROUTE:
        return <CrewPortal width={mainIconSize} height={mainIconSize} />;
      case COVID_DOCUMENT_ROUTE:
        return <Covid width={mainIconSize} height={mainIconSize} />;
      case SETTINGS_ROUTE:
        return <SettingsIcon width={mainIconSize} height={mainIconSize} />;
      default:
        throw Error("Component path cannot be found");
    }
  };

  return (
    <ScrollView
      style={{
        ...styles.scrollView,
        backgroundColor: theme.colors.WhiteBackgroundToDarkBlue,
      }}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <View style={styles.row}>
        {routes.map((route, i) => (
          <TouchableOpacity
            testID={"more-button"}
            style={styles.column}
            key={i}
            onPress={async () => {
              route.action
                ? await handleLink(route.action)
                : route.navigationStack
                ? navigation.navigate(route.navigationStack, {
                    screen: route.navigationName,
                  })
                : navigation.navigate(route.navigationName);
            }}
          >
            <View style={styles.item}>
              <View style={styles.navigationIconsCentered}>
                {chooseIconToUse(route.navigationName)}
                <Text
                  style={{ ...styles.iconsLabel, color: theme.colors.text }}
                >
                  {route.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default MoreScreen;
