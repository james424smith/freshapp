import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import Text from "../../components/StyledText";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { CHAT_ROOM_ROUTE, CHAT_ROUTE } from "../../constants/routes";
import Colors from "../../constants/styles/colors";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/ChatStyles";
import { timeDiffTextMillis, timeToNow } from "../../common/dateUtils";
import {
  GetHistoryPayload,
  NearbySeafarer,
  GET_HISTORY,
} from "../../interfaces";
import {
  setWebsocketData,
  setRefreshingHistoryData,
} from "../../redux/actions";
import { DateTime } from "luxon";
import { useNavigation, useTheme } from "@react-navigation/native";
import { IRootReducerType } from "../../redux/reducers";
import valueOrDefault from "../../common/valueOrDefault";

const leftAvatarListItemStyle = {
  borderWidth: 1,
  borderColor: Colors.grey,
  borderRadius: 50,
};

const ChatHistoryScreen = () => {
  const [currentTime, setCurrentTime] = useState<number>(
    DateTime.local().toMillis()
  );
  const navigation = useNavigation();

  const history = useSelector<IRootReducerType, GetHistoryPayload[]>(
    ({ websocketReducer }) => websocketReducer.history
  );
  const whoIsAround = useSelector<IRootReducerType, NearbySeafarer[]>(
    ({ websocketReducer }) => websocketReducer.whoIsAround
  );
  const isOnline = useSelector<IRootReducerType, boolean>(
    ({ websocketReducer }) => websocketReducer.isOnline
  );
  const onlineUntil = useSelector<IRootReducerType, number>(
    ({ websocketReducer }) => websocketReducer.onlineUntil
  );
  const isLoadingNewHistory = useSelector<IRootReducerType, boolean>(
    ({ websocketReducer }) => websocketReducer.isLoadingNewHistory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let timer: any;
    navigation.addListener("focus", () => {
      timer = setInterval(
        () => setCurrentTime(DateTime.local().toMillis()),
        60000
      );
    });
    navigation.addListener("blur", () => {});

    return () => {
      clearInterval(timer);
    };
  }, [navigation]);

  const handleOnPressChat = (data: GetHistoryPayload | NearbySeafarer) => {
    navigation.navigate(CHAT_ROOM_ROUTE, {
      recipient: {
        recipientId: `${
          (data as GetHistoryPayload).recipientId ||
          (data as NearbySeafarer).oracleId
        }`,
        blob: data.blob,
        firstName: data.firstName,
        familyName: data.familyName,
      },
    });
  };
  const theme = useTheme();

  const dataToRender = (data: GetHistoryPayload) => {
    return (
      <View key={`touchable-${data.recipientId}`}>
        <TouchableOpacity
          testID={"go-to-chat-button"}
          onPress={() => handleOnPressChat(data)}
        >
          <ListItem
            containerStyle={{
              backgroundColor: theme.colors.chatHistoryBackground,
            }}
          >
            <Avatar
              avatarStyle={leftAvatarListItemStyle}
              source={{
                uri: `data:image/png;base64,${data.blob}`,
              }}
            />
            <ListItem.Content>
              <ListItem.Title>
                <View style={styles.unreadCountView}>
                  <Text
                    style={{
                      ...(data.unreadCount > 0 && styles.unreadMessageText),
                      color: theme.colors.text,
                    }}
                  >
                    {valueOrDefault(data.firstName, "")}{" "}
                    {valueOrDefault(data.familyName, "")}
                  </Text>
                  {data.unreadCount > 0 && (
                    <Badge value={data.unreadCount} status="primary" />
                  )}
                </View>
              </ListItem.Title>
              <ListItem.Content>
                <View style={styles.previewMessageContainer}>
                  <View style={styles.previewMessageText}>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(data.unreadCount > 0 && styles.unreadMessageText),
                        color: theme.colors.fadedText,
                      }}
                    >
                      {data.lastMessage}
                    </Text>
                  </View>
                  <View style={styles.inactivityText}>
                    <Text style={{ color: theme.colors.fadedText }}>
                      {timeDiffTextMillis(data.lastMessageTs, currentTime)}
                    </Text>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
    );
  };

  const refreshData = () => {
    if (isOnline) {
      dispatch(setRefreshingHistoryData(true));
      dispatch(
        setWebsocketData({
          messageType: GET_HISTORY,
          payload: { from: 0, size: 100 },
        })
      );
    }
  };

  const outlineToUse = () =>
    isOnline
      ? { borderColor: Colors.marlowBlue }
      : { borderColor: Colors.grey };

  return (
    <View
      style={{
        ...styles.root,
        backgroundColor: theme.colors.chatHistoryBackground,
      }}
    >
      <View style={styles.activeUsersContainer}>
        <View style={styles.activeUsersRow}>
          <View style={styles.remainingTimeContainer}>
            <TouchableHighlight
              testID={"go-to-main-chat"}
              style={[styles.remainingTimeTouchableStyle, outlineToUse()]}
              underlayColor={isOnline ? Colors.blue : Colors.white}
              onPress={() => navigation.navigate(CHAT_ROUTE)}
            >
              <Text style={styles.remainingTimeText}>
                {isOnline && timeToNow(currentTime, onlineUntil)}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList<NearbySeafarer>
              horizontal
              showsHorizontalScrollIndicator={false}
              data={whoIsAround}
              renderItem={({ item }: { item: NearbySeafarer }) => {
                console.log(item);
                return (
                  <View style={styles.avatarContainer} key={item.oracleId}>
                    <Avatar
                      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      testID={"go-to-chat-user"}
                      size={60}
                      containerStyle={styles.avatarContainerStylesForHistory}
                      rounded
                      onPress={() => handleOnPressChat(item)}
                      source={{
                        uri: `data:image/png;base64,${item.blob}`,
                      }}
                      avatarStyle={styles.flatListAvatarStyle}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index: number) =>
                `${item.oracleId} - ${index}`
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.flatListBottomLine} />
      <ScrollView
        testID={"scrollview"}
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingNewHistory}
            onRefresh={refreshData}
          />
        }
      >
        {(valueOrDefault(
          history,
          []
        ) as GetHistoryPayload[]).map((data: GetHistoryPayload) =>
          dataToRender(data)
        )}
      </ScrollView>
    </View>
  );
};

export default ChatHistoryScreen;
