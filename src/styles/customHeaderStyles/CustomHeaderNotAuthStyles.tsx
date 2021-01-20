import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const trackIconSize = wp("9%");

export default StyleSheet.create({
  main: {
    height: hp("15%"),
    justifyContent: "center",
    backgroundColor: Colors.marlowBlue,
  },
  faqsText: {
    fontSize: 24,
    color: Colors.white,
    marginLeft: 20,
    fontWeight: "bold",
  },
  content: {
    margin: hp("1%"),
    flexDirection: "row",
  },
});
