import { StyleSheet } from "react-native";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
  },
  secondaryTitleStyle: {
    borderBottomWidth: 0,
    marginLeft: wp("4%"),
    marginTop: wp("4%"),
    marginBottom: wp("4%"),
    fontSize: hp("2.3%"),
    fontWeight: "bold",
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  description: {
    fontSize: hp("2%"),
  },
  descriptionBold: {
    color: Colors.marlowBlue,
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.2,
    marginTop: wp("6%"),
    marginBottom: wp("6%"),
    marginLeft: wp("6%"),
  },
  notificationContainer: {
    marginHorizontal: wp("8%"),
  },
  dateReadStyle: {
    fontSize: hp("1.7%"),
    paddingBottom: wp("1.5%"),
  },
  dateUnreadStyle: {
    color: Colors.marlowBlue,
    fontSize: hp("1.7%"),
    paddingBottom: wp("1.5%"),
    fontWeight: "bold",
  },
  notificationsView: {
    paddingTop: wp("6%"),
  },
  badgeElementStyle: {
    color: "white",
    fontSize: hp("1.5%"),
    fontWeight: "bold",
  },
  iconBadgeStyle: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    top: wp("-2.8%"),
    right: wp("-2.5%"),
  },
  root: {
    flex: 1,
  },
});
