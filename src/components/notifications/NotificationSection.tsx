import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/NotificationsScreenStyles";
import {
  NotificationDetails,
  ReadNotification,
} from "../../interfaces/notificationsTypes";
import {
  ASSIGNMENT,
  PAYSLIP,
  FLIGHT,
  PERSONAL,
  NEWSLETTER,
  GENERAL,
} from "../../constants/notificationsConstants";
import { useTheme, Theme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";
import * as HandleLinkHelper from "../../common/handleLink";

interface Props {
  markAsRead: (payload: ReadNotification) => void;
  notificationsList?: NotificationDetails[];
}

async function handleOnClick(
  notification: NotificationDetails,
  markAsRead: (payload: ReadNotification) => void
) {
  if (notification.isRead === false) {
    const payload: ReadNotification = {
      notificationRead: true,
      notificationId: notification.notificationId.toString(),
    };
    markAsRead(payload);
  }

  switch (notification.category) {
    case ASSIGNMENT:
      HandleLinkHelper.handleLink("crewcompanion", "assignment");
      break;
    case PAYSLIP:
      HandleLinkHelper.handleLink("crewcompanion", "salaries");
      break;
    case FLIGHT:
      HandleLinkHelper.handleLink("crewcompanion", "flights");
      break;
    case PERSONAL:
      HandleLinkHelper.handleLink("crewcompanion", "documents");
      break;
    case NEWSLETTER:
      HandleLinkHelper.handleLink("crewcompanion", "news");
      break;
    case GENERAL:
      break;
    default:
  }
}

function renderNotification(
  theme: Theme,
  item: NotificationDetails,
  key: number,
  markAsRead: (payload: ReadNotification) => void
) {
  return (
    <View key={key}>
      <View style={styles.notificationContainer}>
        <TouchableOpacity
          testID={"notification-button"}
          onPress={() => handleOnClick(item, markAsRead)}
        >
          <Text
            style={
              item.isRead
                ? { ...styles.dateReadStyle, color: theme.colors.text }
                : {
                    ...styles.dateUnreadStyle,
                    color: theme.colors.createNewAccountColorText,
                  }
            }
          >
            {valueOrDefault(item.date, "")}
          </Text>

          <Text
            style={
              item.isRead
                ? { ...styles.description, color: theme.colors.text }
                : {
                    ...styles.descriptionBold,
                    color: theme.colors.createNewAccountColorText,
                  }
            }
          >
            {valueOrDefault(item.description, "")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineStyle} />
    </View>
  );
}

const NotificationSection = (props: Props) => {
  const { notificationsList, markAsRead } = props;
  const theme = useTheme();

  return (
    <View>
      <View style={styles.notificationsView}>
        {(valueOrDefault(
          notificationsList,
          []
        ) as NotificationDetails[]).map(
          (item: NotificationDetails, i: number) =>
            renderNotification(theme, item, i, markAsRead)
        )}
      </View>
    </View>
  );
};

export default NotificationSection;
