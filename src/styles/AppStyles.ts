import { StyleSheet } from "react-native";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const trackIconSize = wp("9%");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerStyle: {
    backgroundColor: Colors.lightGrey,
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerStyleChat: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerLeftStyleChatRoom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainerStylesChatRoom: {
    zIndex: 0,
  },
  titleValueChatRoom: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginLeft: wp("2%"),
    color: Colors.darkNavy,
  },
  avatarOnHeaderChatRoom: {
    borderWidth: 1,
    borderColor: Colors.aquamarine,
    borderRadius: 50,
    zIndex: 0,
  },
  chatTitle: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    color: Colors.darkNavy,
    marginLeft: wp("2.5%"),
    marginTop: wp("1%"),
  },
  moreTitleContainer: {
    marginLeft: wp("5%"),
    width: "100%",
    flexDirection: "row",
  },
  faqContainer: {
    width: "100%",
    paddingLeft: wp("15%"),
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  moreContainer: { width: "90%", justifyContent: "flex-start" },

  moreTitleValue: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: Colors.darkNavy,
  },
  headerStyleNotification: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
  },
  headerStyleFlights: {
    backgroundColor: Colors.marlowBlue,
    borderBottomWidth: 0,
    elevation: 0,
  },
  titleValueFlights: {
    fontSize: hp("3.2%"),
    fontWeight: "bold",
    color: "white",
    marginLeft: wp("7%"),
  },
  headerStyleAssignment: {
    shadowColor: Colors.lightGrey,
    backgroundColor: Colors.lightGrey,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    // fontWeight: "bold",
    // textAlign: "center",
    // alignSelf: "center",
    // alignItems: "center",
    // flex: 1,
  },

  titleContainer: {
    marginLeft: wp("4%"),
  },
  titleValue: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: Colors.darkNavy,
  },
  logoTopContainer: {
    marginLeft: wp("4.5%"),
  },
  vesselTrackerContainer: {
    marginRight: wp("4.5%"),
  },
});
