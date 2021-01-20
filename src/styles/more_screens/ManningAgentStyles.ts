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
  scrollViewContainer: {
    flexGrow: 1,
  },
  detailsLabel: {
    fontSize: hp("1.7%"),
    marginTop: wp("8%"),
    marginHorizontal: wp("8%"),
  },
  detailsValue: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    marginHorizontal: wp("8%"),
    color: Colors.darkNavy,
  },
  detailsValueU: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    marginHorizontal: wp("8%"),
    textDecorationLine: "underline",
    color: Colors.darkNavy,
  },
  numbersView: {
    flex: 1,
    flexDirection: "row",
  },
  columnContainer: {
    width: "50%",
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginTop: wp("8%"),
  },
  endSpace: {
    marginBottom: "30%",
  },
});
