import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  AppState,
  AppStateStatus,
  Platform,
} from "react-native";
import Text from "../../components/StyledText";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  Time,
} from "react-native-gifted-chat";
import Colors from "../../constants/styles/colors";
import styles from "../../styles/ChatStyles";
import { useSelector, useDispatch } from "react-redux";
import { setWebsocketData } from "../../redux/actions";
import { Auth } from "aws-amplify";
import {
  GET_CONVERSATION,
  SEND_MESSAGE,
  ProfilePayload,
  LEFT_CONVERSATION,
  Recipient,
  NearbySeafarer,
  WebsocketEvent,
} from "../../interfaces";
import _ from "lodash";
import { IOS } from "../../constants/Platforms";
import LoadingScreen from "../../components/LoadingScreen";
import { RouteProp } from "@react-navigation/core";
import { IRootReducerType } from "../../redux/reducers";
import { ChatStackParamList } from "../../navigation/MainTabNavigator";
import { useTheme, useNavigation } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

interface Props {
  route: RouteProp<ChatStackParamList, "ChatRoom">;
}

const wrapperLeftStyle: StyleProp<ViewStyle> = {
  backgroundColor: Colors.bubbleLeft,
  borderRadius: 20,
};

const wrapperRightStyle: StyleProp<ViewStyle> = {
  backgroundColor: Colors.white,
  borderColor: Colors.grey,
  borderWidth: 0.5,
  borderRadius: 20,
};

const textLeftStyles = {
  color: Colors.white,
  fontFamily: "Roboto",
  marginTop: 15,
};
const textRightStyles = {
  color: Colors.darkNavy,
  fontFamily: "Roboto",
  marginTop: 15,
};
const timeRightStyles = {
  color: Colors.darkNavy,
  fontFamily: "Roboto",
  fontSize: 10,
};
const timeLeftStyles = {
  color: Colors.white,
  fontFamily: "Roboto",
  fontSize: 10,
};

const logoSize = 100;

const useIsMounted = () => {
  const [, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
};

const useIsAuthenticated = (
  route: RouteProp<ChatStackParamList, "ChatRoom">
) => {
  const [, setUserId] = useState<string>("");
  useLayoutEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user: any) => {
        setUserId(user.username);
      })
      .catch((error: any) => console.log(error));
  }, [route.params]);
};

const useGetDataFromRedux = (recipientId?: string) => {
  const { messages, profile, whoIsAround, isOnline } = useSelector<
    IRootReducerType,
    {
      messages: any[];
      profile?: ProfilePayload;
      whoIsAround: NearbySeafarer[];
      isOnline: boolean;
    }
  >(({ websocketReducer }) => {
    return {
      messages: websocketReducer[`${recipientId}`],
      profile: websocketReducer.profile,
      whoIsAround: websocketReducer.whoIsAround,
      isOnline: websocketReducer.isOnline,
    };
  });
  return { messages, profile, whoIsAround, isOnline };
};

const ChatRoomScreen = (props: Props) => {
  const appState = React.useRef<AppStateStatus>("active" as AppStateStatus);
  const { route } = props;
  const { messages, profile, whoIsAround, isOnline } = useGetDataFromRedux(
    route.params.recipient.recipientId
  );
  useIsMounted();
  useIsAuthenticated(route);
  const [isLoadingEarlier] = useState<boolean>(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const [recipient, setRecipient] = useState<Recipient>({
    recipientId: "",
    blob: "",
    firstName: "",
    familyName: "",
  });

  const dispatch = useDispatch();

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        nextAppState.match(/inactive|background/) &&
        appState.current === "active"
      ) {
        const event: WebsocketEvent = {
          messageType: LEFT_CONVERSATION,
          payload: {},
        };
        dispatch(setWebsocketData(event));
        appState.current = nextAppState;
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const recipientToStore: Recipient = route.params?.recipient;
        const event: WebsocketEvent = {
          messageType: GET_CONVERSATION,
          payload: {
            recipientId: recipientToStore.recipientId,
            from: 0,
            size: 100,
          },
        };
        dispatch(setWebsocketData(event));
        appState.current = nextAppState;
      }
    },
    [dispatch, route.params.recipient]
  );

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      const recipientToStore: Recipient = route.params?.recipient;
      setRecipient(recipientToStore);
      const event: WebsocketEvent = {
        messageType: GET_CONVERSATION,
        payload: {
          recipientId: recipientToStore.recipientId,
          from: 0,
          size: 100,
        },
      };
      dispatch(setWebsocketData(event));
      AppState.addEventListener("change", handleAppStateChange);
    });
    const blurListener = navigation.addListener("blur", () => {
      const event: WebsocketEvent = {
        messageType: LEFT_CONVERSATION,
        payload: {},
      };
      dispatch(setWebsocketData(event));
      AppState.removeEventListener("change", handleAppStateChange);
    });
    return () => {
      blurListener();
      focusListener();
    };
  }, [handleAppStateChange, navigation, dispatch, route.params]);

  useLayoutEffect(() => {
    const recipientToStore: Recipient = route.params?.recipient;
    setRecipient(recipientToStore);
  }, [navigation, route.params]);

  const onSend = (messagesLocal: any = []) => {
    const now = new Date().getTime();
    dispatch(
      setWebsocketData({
        messageType: SEND_MESSAGE,
        payload: {
          text: messagesLocal[0],
          createdAt: now,
          user: {
            _id: profile?.oracleId,
            blob: profile?.blob,
            name: `${profile?.firstName} ${profile?.familyName}`,
          },
          recipient: recipient,
        },
      })
    );
  };

  const renderTime = (chatProps: Time["props"]) => {
    return (
      <Time
        {...chatProps}
        timeTextStyle={{
          right: {
            ...timeRightStyles,
            color: theme.colors.blackAndWhite,
          },
          left: timeLeftStyles,
        }}
      />
    );
  };

  const renderBubble = (chatProps: Bubble["props"]) => {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.chatMessageDarkMode,
        }}
      >
        <View style={styles.mainContainer}>
          <Bubble
            {...chatProps}
            wrapperStyle={{
              left: wrapperLeftStyle,
              right: {
                ...wrapperRightStyle,
                backgroundColor: theme.colors.colorInputText,
              },
            }}
            textStyle={{
              left: textLeftStyles,
              right: {
                ...textRightStyles,
                color: theme.colors.blackAndWhite,
              },
            }}
            renderTime={renderTime}
            renderTicks={() => <View />}
          />
        </View>
      </View>
    );
  };

  const renderInputToolbar = (chatProps: InputToolbar["props"]) => {
    if (!isOnline) {
      return (
        <Text style={{ color: theme.colors.text }}>
          Offline users cannot participate in a chat.
        </Text>
      );
    } else if (
      !_.find(whoIsAround, {
        oracleId: valueOrDefault(recipient.recipientId, ""),
      })
    ) {
      const recipientLocal: Recipient = route.params?.recipient;
      return (
        <Text style={{ color: theme.colors.text }}>
          {recipientLocal.firstName} is either offline or outside of your 30km
          radius.
        </Text>
      );
    } else {
      return (
        <InputToolbar
          {...chatProps}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          placeholderTextColor={{
            ...styles.placeholderTextColor,
            color: theme.colors.forgotPasswordLink,
          }}
          placeholder="Message..."
          textInputStyle={{
            ...styles.inputToolBarTextStyle,
            color: theme.colors.darkNavyToWhite,
          }}
          containerStyle={{
            ...styles.inputToolBarContainerStyle,
            backgroundColor: theme.colors.colorInputText,
          }}
        />
      );
    }
  };

  const renderSend = (chatProps: Send["props"]) => {
    return (
      <Send
        {...chatProps}
        containerStyle={{}}
        textStyle={{
          color: Colors.grey,
        }}
      />
    );
  };
  return (
    <SafeAreaView
      style={styles.container}
      accessible
      accessibilityLabel="main"
      testID="main"
    >
      <KeyboardAvoidingView style={styles.keyboardAvoidingViewStyle}>
        <View
          style={{
            ...styles.giftedChatContainerViewStyle,
            backgroundColor: theme.colors.chatMessageDarkMode,
          }}
        >
          <GiftedChat
            renderLoading={() => (
              <LoadingScreen
                logoHeightSize={logoSize}
                logoWidthSize={logoSize}
              />
            )}
            messages={messages}
            user={{
              _id: valueOrDefault(profile?.oracleId, "") as string,
              avatar: profile?.blob,
              name: valueOrDefault(
                `${profile?.firstName} ${profile?.familyName}`,
                ""
              ) as string,
            }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            renderAvatar={null}
            bottomOffset={Platform.OS === IOS ? 60 : 0}
            onSend={onSend}
            isLoadingEarlier={isLoadingEarlier}
            keyboardShouldPersistTaps="never"
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
