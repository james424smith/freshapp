import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/styles/colors";
import AssignmentScreen from "../screens/AssignmentScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FlightsScreen from "../screens/FlightsScreen";
import NotificationIcon from "../components/notifications/NotificationIcon";
import ChatIcon from "../components/chat/ChatIcon";
import EmploymentOfferScreen from "../screens/assignments/EmploymentOfferScreen";
import styles, { trackIconSize } from "../styles/AppStyles";
import Text from "../components/StyledText";
import { View, Platform, Alert, TouchableOpacity } from "react-native";
import VesselTrackerScreen from "../screens/more_screens/VesselTrackerScreen";
import { MoreStack } from "./MoreScreenNavigation";
import Back from "../components/BackIcon";
import WhosAroundScreen from "../screens/chat/WhosAroundScreen";
import ChatHistoryScreen from "../screens/chat/ChatHistoryScreen";
import ChatRoomScreen from "../screens/chat/ChatRoomScreen";
import SeafarerDetails from "../screens/more_screens/SeafarerDetailsScreen";
import LatestReleases from "../screens/news/ReadMoreNewsScreen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WebsocketInit from "../screens/BottomTabMainScreen";
import { IOS } from "../constants/Platforms";
import { NewNewsletter, Recipient } from "../interfaces";
import VesselTrackerIcon from "../../assets/icons/004-map-1.svg";
import CrewCompanion from "../../assets/icons/CrewCompanion.svg";
import Assignments from "../../assets/icons/bottom_navigation/002-ships.svg";
import Flights from "../../assets/icons/bottom_navigation/003-plane.svg";
import More from "../../assets/icons/bottom_navigation/012-menu-2.svg";
import { Avatar } from "react-native-elements";
import { logoWidthSize } from "../styles/AuthStyles";
import { VESSEL_TRACKER_ROUTE } from "../constants/routes";
import { useTheme } from "@react-navigation/native";
import { CURRENT, NEXT } from "../constants/assignmentConstants";

const mainIconSize = wp("5%");
const smallIconSize = 17;

export type AssignmentStackParamList = {
  Assignment: undefined;
  EmploymentOffer: { assignmentType: typeof CURRENT | typeof NEXT };
  AssignmentSeafarerProfile: undefined;
  LatestReleases: {
    newItem: NewNewsletter;
  };
  VesselTracker: undefined;
};

const alertTitle = "Warning!";
const alertMsg =
  "Data may not be accurate. Marlow receives position data once per day at 08:00 AM Cyprus time";
const Assignment = () => {
  const AssignmentStack = createStackNavigator<AssignmentStackParamList>();
  const theme = useTheme();

  return (
    <AssignmentStack.Navigator
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <AssignmentStack.Screen
        component={AssignmentScreen}
        name="Assignment"
        options={({ navigation }) => ({
          headerStyle: {
            ...styles.headerStyleAssignment,
            backgroundColor: theme.colors.primary,
          },
          headerLeft: () => (
            <View style={styles.logoTopContainer}>
              <CrewCompanion width={logoWidthSize} height={hp("10%")} />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.vesselTrackerContainer}
              testID={"vessel-tracker-button"}
              onPress={(): void => {
                Alert.alert(
                  alertTitle,
                  alertMsg,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Ok",
                      onPress: () => navigation.navigate(VESSEL_TRACKER_ROUTE),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <VesselTrackerIcon
                fill={theme.colors.blackAndWhite}
                width={trackIconSize}
                height={trackIconSize}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AssignmentStack.Screen
        component={EmploymentOfferScreen}
        name="EmploymentOffer"
        options={{
          headerStyle: {
            ...styles.headerTitleStyle,
            backgroundColor: theme.colors.primary,
          },
          headerLeft: () => <Back goBack={true} />,
          headerRight: () => <View />,
          title: "Employment Offer",
        }}
      />
      <AssignmentStack.Screen
        component={SeafarerDetails}
        name="AssignmentSeafarerProfile"
        options={{
          headerStyle: {
            ...styles.headerTitleStyle,
            backgroundColor: theme.colors.background,
          },
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Profile",
        }}
      />
      <AssignmentStack.Screen
        component={LatestReleases}
        name="LatestReleases"
        options={{
          headerStyle: {
            ...styles.headerTitleStyle,
            backgroundColor: theme.colors.primary,
          },
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "",
        }}
      />
      <AssignmentStack.Screen
        component={VesselTrackerScreen}
        name="VesselTracker"
        options={{
          headerLeft: () => <Back goBack={true} />,
          headerStyle: {
            ...styles.headerTitleStyle,
            backgroundColor: theme.colors.primary,
          },
          headerRight: () => <View />,
          title: "Vessel Tracker",
        }}
      />
    </AssignmentStack.Navigator>
  );
};

const FlightsStack = () => {
  type FlightStackParamList = {
    Flights: undefined;
  };
  const FlightStack = createStackNavigator<FlightStackParamList>();
  return (
    <FlightStack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <FlightStack.Screen
        name="Flights"
        component={FlightsScreen}
        options={{
          title: "",
          headerStyle: styles.headerStyleFlights,
          headerLeft: () => (
            <View>
              <Text style={styles.titleValueFlights}>Flights</Text>
            </View>
          ),
        }}
      />
    </FlightStack.Navigator>
  );
};

export type ChatStackParamList = {
  MainChat: undefined;
  ChatHistory: undefined;
  ChatRoom: { recipient: Recipient };
};
const ChatStack = () => {
  const ChatStackInner = createStackNavigator<ChatStackParamList>();
  const theme = useTheme();
  return (
    <ChatStackInner.Navigator screenOptions={{ title: "" }}>
      <ChatStackInner.Screen
        name="MainChat"
        component={WhosAroundScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStackInner.Screen
        name="ChatHistory"
        component={ChatHistoryScreen}
        options={{
          headerStyle: {
            ...styles.headerStyleChat,
            backgroundColor: theme.colors.primary,
          },
          headerLeft: () => (
            <View>
              <Text style={{ ...styles.chatTitle, color: theme.colors.text }}>
                Chat
              </Text>
            </View>
          ),
        }}
      />
      <ChatStackInner.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => {
          const recipient = route.params?.recipient;
          return {
            headerStyle: {
              ...styles.headerStyleAssignment,
              backgroundColor: theme.colors.primary,
            },
            headerLeft: () => (
              <View style={styles.headerLeftStyleChatRoom}>
                <Back goBack={true} />
                <Avatar
                  rounded
                  containerStyle={styles.avatarContainerStylesChatRoom}
                  source={{
                    uri: `data:image/png;base64,${recipient.blob}`,
                  }}
                  avatarStyle={styles.avatarOnHeaderChatRoom}
                />
                <Text
                  style={{
                    ...styles.titleValueChatRoom,
                    color: theme.colors.darkNavyToWhite,
                  }}
                >{`${recipient.firstName} ${recipient.familyName}`}</Text>
              </View>
            ),
          };
        }}
      />
    </ChatStackInner.Navigator>
  );
};

const NotificationsStack = () => {
  type NotificationsStackParamList = {
    Notifications: undefined;
  };
  const theme = useTheme();
  const NotificationsStackInner = createStackNavigator<NotificationsStackParamList>();
  return (
    <NotificationsStackInner.Navigator screenOptions={{ title: "" }}>
      <NotificationsStackInner.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerStyle: {
            ...styles.headerStyleNotification,
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => (
            <View style={styles.titleContainer}>
              <Text style={{ ...styles.titleValue, color: theme.colors.text }}>
                Notifications
              </Text>
            </View>
          ),
        }}
      />
    </NotificationsStackInner.Navigator>
  );
};

type TabNavigationParamList = {
  AssignmentStack: undefined;
  FlightsStack: undefined;
  ChatStack: undefined;
  NotificationsStack: undefined;
  MoreStack: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export default () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props: any) => <WebsocketInit {...props} />}
      initialRouteName="AssignmentStack"
      tabBarOptions={{
        activeTintColor: theme.colors.tabNavigatorBlueToDark,
        keyboardHidesTabBar: Platform.OS !== IOS,
        inactiveTintColor: Colors.grey,
      }}
    >
      <Tab.Screen
        component={Assignment}
        name="AssignmentStack"
        options={() => ({
          initialRouteName: "Assignment",
          tabBarLabel: "Assignment",
          path: "assignment",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Assignments
              testID={"assignments-icon-button"}
              width={mainIconSize}
              height={mainIconSize}
              fill={focused ? theme.colors.tabNavigatorBlueToDark : Colors.grey}
            />
          ),
        })}
      />
      <Tab.Screen
        component={FlightsStack}
        name="FlightsStack"
        options={() => ({
          initialRouteName: "Flights",
          tabBarLabel: "Flights",
          path: "flights",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Flights
              testID={"flights-icon-button"}
              width={mainIconSize}
              height={mainIconSize}
              fill={focused ? theme.colors.tabNavigatorBlueToDark : Colors.grey}
            />
          ),
        })}
      />
      <Tab.Screen
        component={ChatStack}
        name="ChatStack"
        options={() => ({
          keyboardHidesTabBar: false,
          tabBarLabel: "Chat",
          initialRouteName: "MainChat",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <ChatIcon mainIconSize={mainIconSize} focused={focused} />
          ),
        })}
      />
      <Tab.Screen
        component={NotificationsStack}
        name="NotificationsStack"
        options={() => ({
          initialRouteName: "Notifications",
          tabBarLabel: "Notifications",
          path: "notifications",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <NotificationIcon mainIconSize={mainIconSize} focused={focused} />
          ),
        })}
      />
      <Tab.Screen
        component={MoreStack}
        name="MoreStack"
        options={() => ({
          initialRouteName: "MoreScreen",
          tabBarLabel: "More",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <More
              testID={"more-icon-button"}
              width={smallIconSize}
              height={smallIconSize}
              fill={focused ? theme.colors.tabNavigatorBlueToDark : Colors.grey}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
