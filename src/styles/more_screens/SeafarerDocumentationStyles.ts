import Colors from "../../constants/styles/colors";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const flexStart = "flex-start";

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  svgContainer: {
    marginTop: wp("4%"),
  },
  makeFlexGrow: {
    flexGrow: 1,
  },
  elevation: {
    flex: 1,
    shadowColor: Colors.grey,
    backgroundColor: Colors.lightGrey,
    elevation: 5,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  outerView: {
    margin: wp("3%"),
    marginBottom: wp("1.2%"),
    flex: 1,
  },
  topContainer: {
    alignContent: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: flexStart,
    marginTop: wp("3%"),
  },
  makeRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: flexStart,
    width: "100%",
  },

  makeRowDate: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  columnContainer: {
    width: "53%",
  },
  columnContainerSvg: {
    width: "7%",
  },
  columnContainerExpire: {
    width: "40%",
  },
  documentContainer: {
    marginTop: wp("2.5%"),
    marginBottom: wp("2.5%"),
    marginLeft: wp("7%"),
    marginRight: wp("3%"),
    flex: 1,
  },
  buttonStyle: {
    alignItems: "center",
    padding: wp("4%"),
  },
  activeTouchableOpacityLabel: {
    fontSize: hp("2%"),
    color: Colors.aquamarine,
    borderBottomWidth: 2,
    borderBottomColor: Colors.aquamarine,
  },
  inactiveTouchableOpacityLabel: {
    fontSize: hp("1.7%"),
    color: Colors.darkNavy,
    opacity: 0.5,
    fontWeight: "bold",
  },
  activeOpacity: {
    opacity: 1,
  },
  inactiveOpacity: {
    opacity: 0.5,
  },
  textDescription: {
    color: Colors.darkNavy,
    fontSize: hp("2%"),
  },
  textNation: {
    color: Colors.darkNavy,
    fontSize: hp("1.7%"),
  },
  textDocLicNumber: {
    color: Colors.grey,
    fontSize: hp("1.7%"),
    marginTop: wp("1%"),
  },
  textIssueDate: {
    color: Colors.grey,
    fontSize: hp("1.8%"),
  },
  dateTextActive: {
    color: Colors.darkNavy,
    fontSize: hp("1.7%"),
    marginLeft: wp("2%"),
  },
  dateText: {
    fontSize: hp("1.7%"),
    marginLeft: wp("2%"),
  },

  dateTextActiveIssued: {
    color: Colors.darkNavy,
    fontSize: hp("1.7%"),
  },
  dateTextIssued: {
    fontSize: hp("1.7%"),

    color: Colors.darkNavy,
  },

  shareButtonContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: flexStart,
  },
  shareButtonStyle: {
    padding: 15,
  },
  markedContainer: {
    width: "5%",
  },
  firstRowContainer: {
    width: "75%",
    marginLeft: wp("2%"),
  },
  documentDetailsContainer: {
    width: "95%",
    marginLeft: wp("2%"),
  },
  issuedDateContainer: {
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "30%",
    alignItems: flexStart,
    justifyContent: flexStart,
  },
  topSeparateLine: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    marginTop: wp("2%"),
  },
  separateLine: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginTop: wp("2%"),
    marginLeft: wp("6%"),
  },

  toggleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("3%"),
  },
  shouldRenderToggleContainer: {
    width: "20%",
  },
  alertContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  isOfflineContainerColor: {
    backgroundColor: Colors.marlowBlueOp,
    borderRadius: 5,
  },
  isOnlineContainerColor: {
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  isDeactivatedContainerColor: {
    backgroundColor: "#DCDCDC",
    borderRadius: 5,
  },
  isDeactivatedElevation: {
    flex: 1,
    shadowColor: Colors.grey,
    backgroundColor: Colors.lightGrey,
    elevation: 1,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  isDeactivatedTextDescription: {
    color: Colors.black,
    fontSize: hp("2%"),
  },
  isDeactivatedTextNation: {
    color: Colors.grey,
    fontSize: hp("1.7%"),
  },

  svgSize: {
    height: hp("4%"),
    width: wp("4%"),
  },
  centerIndicator: {
    flex: 1,
    marginBottom: wp("6%"),
    alignItems: "center",
    justifyContent: "center",
  },
  endSpace: {
    marginBottom: "30%",
  },
});
