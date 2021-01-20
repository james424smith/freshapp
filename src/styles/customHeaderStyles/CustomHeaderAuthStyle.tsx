import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const trackIconSize = wp("9%");

export default StyleSheet.create({
  main: {
    height: hp("6%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: hp("1%"),
  },
  screenTitleText: {
    fontWeight: "bold",
    fontSize: hp("2.5%"),
  },
});
