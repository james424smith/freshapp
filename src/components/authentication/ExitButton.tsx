import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { SIGN_IN_ROUTE, SWIPE_SCREEN_ROUTE } from "../../constants/routes";
import styles from "../../styles/AuthStyles";

interface Props {
  path: "SWIPE" | "SIGN_IN";
  containerStyles?: Record<string, string | number>;
}

const ExitButton = (props: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const dataToUse =
    props.path === "SWIPE"
      ? {
          name: "arrow-forward-circle-outline",
          screen: SWIPE_SCREEN_ROUTE,
        }
      : {
          name: "close-circle-outline",
          screen: SIGN_IN_ROUTE,
        };

  return (
    <View style={props.containerStyles ?? styles.exitButtonContainer}>
      <Icon
        testID={"exit-button"}
        name={dataToUse.name}
        type="ionicon"
        color={theme.colors.blackAndWhite}
        size={30}
        style={styles.skipButton}
        onPress={() =>
          navigation.dispatch(
            StackActions.replace("Auth", {
              screen: dataToUse.screen,
            })
          )
        }
      />
    </View>
  );
};

export default ExitButton;
