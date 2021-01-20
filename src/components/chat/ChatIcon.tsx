import React, { useState } from "react";
import { useSelector } from "react-redux";
import {} from "../../redux/actions";
import IconBadge from "react-native-icon-badge";
import Colors from "../../constants/styles/colors";
import Text from "../StyledText";
import styles from "../../styles/NotificationsScreenStyles";
import { Animated } from "react-native";
import { IRootReducerType } from "../../redux/reducers";
import Chat from "../../../assets/icons/bottom_navigation/014-chat-1.svg";
import { useTheme } from "@react-navigation/native";
import { reduceToSumNumbersCounter } from "../../common/reduceToSumNumbersCounter";

interface Props {
  mainIconSize: number;
  focused: boolean;
}

const NotificationIcon = (props: Props) => {
  const [animationValue] = useState<Animated.Value>(new Animated.Value(0));
  const theme = useTheme();
  const { mainIconSize, focused } = props;
  const unreadCount = useSelector<IRootReducerType, number>(
    ({ websocketReducer }) =>
      reduceToSumNumbersCounter(
        websocketReducer.history.map((a) => ({ unreadCount: a.unreadCount })),
        "unreadCount"
      )
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
          <Chat
            testID={"chat-icon-button"}
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
