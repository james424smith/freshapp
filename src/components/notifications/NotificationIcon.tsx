import React, { useState } from "react";
import { useSelector } from "react-redux";
import {} from "../../redux/actions";
import IconBadge from "react-native-icon-badge";
import Colors from "../../constants/styles/colors";
import Text from "../StyledText";
import styles from "../../styles/NotificationsScreenStyles";
import { Animated } from "react-native";
import { IRootReducerType } from "../../redux/reducers";
import Notifications from "../../../assets/icons/bottom_navigation/005-bell.svg";
import { useTheme } from "@react-navigation/native";

interface Props {
  mainIconSize: number;
  focused: boolean;
}

const NotificationIcon = (props: Props) => {
  const [animationValue] = useState<Animated.Value>(new Animated.Value(0));
  const theme = useTheme();
  const { mainIconSize, focused } = props;
  const unreadCount = useSelector<IRootReducerType, number>(
    ({ notificationsDetails }) =>
      notificationsDetails.notificationsDetails.unreadCount
  );

  const rotateInterpolate = animationValue.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    outputRange: [
      "0deg",
      "-30deg",
      "-60deg",
      "-30deg",
      "0deg",
      "30deg",
      "60deg",
      "30deg",
      "0deg",
    ],
  });
  const animatedStyle = { transform: [{ rotate: rotateInterpolate }] };
  return (
    <Animated.View style={animatedStyle}>
      <IconBadge
        MainElement={
          <Notifications
            testID={"notification-icon-button"}
            width={mainIconSize}
            height={mainIconSize}
            fill={focused ? theme.colors.tabNavigatorBlueToDark : Colors.grey}
          />
        }
        BadgeElement={
          <Text style={styles.badgeElementStyle}>{unreadCount}</Text>
        }
        IconBadgeStyle={styles.iconBadgeStyle}
        Hidden={!unreadCount}
      />
    </Animated.View>
  );
};

export default NotificationIcon;
