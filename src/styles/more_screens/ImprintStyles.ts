import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollbar: {
    flexGrow: 1,
  },
  detailsLightStyle: {
    fontSize: hp("1.8%"),
    marginTop: wp("8%"),
    marginHorizontal: wp("8%"),
  },
  detailsBoldValue: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    marginHorizontal: wp("8%"),
    color: Colors.darkNavy,
  },
  detailsClickValue: {
    fontWeight: "bold",
    fontSize: hp("2%"),
    marginHorizontal: wp("8%"),
    textDecorationLine: "underline",
    color: Colors.darkNavy,
  },
  addressLine: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: 1,
    marginHorizontal: wp("8%"),
    color: Colors.darkNavy,
  },
  addressLineU: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    marginHorizontal: wp("8%"),
    textDecorationLine: "underline",
    color: Colors.darkNavy,
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.0,
    marginTop: wp("8%"),
  },
  contactPartView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: wp("8%"),
  },
  columnContainer: {
    width: "50%",
  },
  endSpace: {
    marginBottom: wp("8%"),
  },
  chairmanViewSpace: {
    marginBottom: wp("5%"),
  },
});
