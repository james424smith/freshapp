import { StyleSheet } from "react-native";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  unreadCountView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  isOnlineView: {
    flexGrow: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-around",
  },
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: { flex: 1, backgroundColor: Colors.lightGrey },
  mainContainer: { flex: 1, margin: wp("1%") },
  headerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    elevation: 0,
    borderColor: Colors.grey,
  },
  avatarContainerStyles: {
    left: wp("-9%"),
    marginLeft: wp("2%"),
    zIndex: 0,
  },
  avatarContainerStylesForHistory: {
    marginLeft: wp("2%"),
    zIndex: 0,
  },
  titleValue: {
    left: wp("-9%"),
    fontSize: hp("2%"),
    fontWeight: "700",
    color: Colors.darkNavy,
    marginLeft: wp("1.5%"),
  },
  timeLabelContainer: {
    // flex: 1,
    // marginTop: "10%",
    // alignContent: "center",
    // justifyContent: "center",
  },
  timeSelectionRow: {
    flex: 1,
    flexDirection: "row",
    // marginTop: wp("2%"),
  },
  timeLabelText: {
    fontSize: hp("2.0%"),
    // marginTop: wp("10%"),
    textAlign: "center",
  },
  whosAroundContainer: {
    // marginTop: wp("20%"),
    // flex: 1,
    alignSelf: "center",
  },
  whosAroundStatusText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: hp("3%"),
    paddingBottom: wp("4%"),
  },
  whosAroundParagraph: {
    textAlign: "center",
    fontSize: hp("1.8%"),
  },
  closeIconContainer: {
    alignSelf: "flex-end",
    // padding: wp("4%"),
    marginTop: wp("10%"),
    // marginLeft: wp("4%"),
  },
  closeIconStyle: {
    height: hp("4%"),
    width: wp("4.5%"),
    marginRight: wp("5%"),
  },
  toggleContainer: {
    alignSelf: "center",
    // paddingVertical: wp("7%"),
  },
  spaceView: {
    width: "20%",
  },
  pickerView: {
    width: "30%",
  },
  inactivityText: {
    width: "20%",
    alignItems: "flex-end",
  },
  previewMessageContainer: {
    flex: 1,
    flexDirection: "row",
  },
  previewMessageText: {
    width: "80%",
  },
  remainingTimeText: {
    color: Colors.marlowBlue,
    fontWeight: "bold",
    fontSize: hp("2.5%"),
  },
  flatListContainer: {
    width: "80%",
  },
  avatarContainer: {
    borderRadius: 50,
  },
  flatListAvatarStyle: {
    borderWidth: 2,
    borderColor: Colors.aquamarine,
    borderRadius: 50,
  },
  flatListBottomLine: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
  },
  unreadMessageText: {
    fontWeight: "bold",
    borderBottomColor: Colors.grey,
  },
  readMessageText: {
    fontWeight: undefined,
  },
  listLeftAvatarStyle: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 50,
  },
  activeUsersContainer: {
    marginVertical: wp("3%"),
    marginLeft: wp("3%"),
  },
  activeUsersRow: {
    flexDirection: "row",
  },
  remainingTimeContainer: {
    width: "20%",
  },
  remainingTimeTouchableStyle: {
    borderRadius: 60,
    width: 60,
    height: 60,

    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  leftChatBubble: {
    backgroundColor: Colors.bubbleLeft,
    borderRadius: 20,
  },
  rightChatBubble: {
    backgroundColor: Colors.green,
    borderColor: "#707070",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  inputToolBarContainerStyle: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderTopColor: Colors.grey,
  },
  inputToolBarTextStyle: {
    color: Colors.darkNavy,
    fontFamily: "Roboto",
  },
  placeholderTextColor: { color: Colors.grey },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
  giftedChatContainerViewStyle: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    margin: 0,
  },
});
