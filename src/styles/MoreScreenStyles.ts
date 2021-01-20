import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/styles/colors";

export const mainIconSize = wp("8%");
export const smallIconSize = wp("7%");

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoutContainer: {
    marginRight: wp("4%"),
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.moreScreenLines,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
    flex: 1,
  },
  item: {
    height: hp("22%"),
    borderWidth: 0.3,
    borderColor: "#d6d7da",
  },
  navigationIconsCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconsLabel: {
    paddingTop: wp("2%"),
    textAlign: "center",
    fontSize: hp("2%"),
  },
});
