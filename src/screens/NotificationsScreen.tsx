import React, { useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotificationsDetails,
  sendNotificationsDetails,
  setRefreshingNotificationsDetails,
} from "../redux/actions";
import { Notification, ReadNotification } from "../interfaces";
import styles from "../styles/NotificationsScreenStyles";
import NotificationsSection from "../components/notifications/NotificationSection";

import { IRootReducerType } from "../redux/reducers";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const notifications = useSelector<IRootReducerType, Notification>(
    ({ notificationsDetails }) => notificationsDetails.notificationsDetails
  );
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ notificationsDetails }) => notificationsDetails.loader
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const markAsRead = (payload: ReadNotification) => {
    dispatch(sendNotificationsDetails(payload));
  };

  useEffect(() => {
    const _navListener = navigation.addListener("focus", () => {
      dispatch(getNotificationsDetails());
    });
    return () => {
      _navListener();
    };
  }, [dispatch, navigation]);

  const refreshData = () => {
    dispatch(setRefreshingNotificationsDetails(true));
    dispatch(getNotificationsDetails());
  };

  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.scrollViewStyle}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
      }
    >
      <View>
        <NotificationsSection
          notificationsList={notifications?.notifications}
          markAsRead={markAsRead}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;
