import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomeIcon from "../../../assets/icons/homebutton.svg";
import styles from "../../styles/customHeaderStyles/CustomHeaderNotAuthStyles";
import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { SIGN_IN_ROUTE } from "../../constants/routes";
type Props = {
  screenTitle: string;
};

const CustomHeaderNotAuth = (props: Props) => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.main,
        backgroundColor: theme.colors.marlowBlueToDarkMode,
      }}
    >
      <View style={styles.content}>
        <TouchableOpacity
          testID={"home-button"}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace("Auth", { screen: SIGN_IN_ROUTE })
            )
          }
        >
          <HomeIcon size={20} />
        </TouchableOpacity>
        <Text style={styles.faqsText}>{props.screenTitle}</Text>
      </View>
    </View>
  );
};

export default CustomHeaderNotAuth;
