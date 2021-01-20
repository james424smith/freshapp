import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const flexStart = "flex-start";

export default StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  opacitiesView: {
    flex: 1,
    marginTop: wp("10%"),
  },
  root: {
    flex: 1,
  },
  opacityStyle: {
    flex: 1,
    shadowColor: Colors.grey,
    elevation: 5,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  opacityOuterView: {
    margin: wp("4%"),
    marginBottom: wp("1.2%"),
    flex: 1,
  },

  makeRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: flexStart,
    width: "100%",
    marginBottom: wp("2.5%"),
    marginTop: wp("2%"),
  },

  payslipContainer: {
    marginTop: wp("2.5%"),
    marginBottom: wp("2.5%"),
    marginLeft: wp("7.5%"),
    marginRight: wp("2.5"),
    flex: 1,
  },

  activeOpacity: {
    opacity: 1,
  },

  inactiveOpacity: {
    opacity: 0.5,
  },

  textDescription: {
    color: Colors.darkNavy,
    fontSize: hp("2.4%"),
    marginLeft: wp("2.3"),
    width: "70%",
  },

  stableLineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.7,
    marginTop: wp("6%"),
  },
  separateLine: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.7,
    marginLeft: wp("0%"),
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
  svgSize: {
    height: hp("4%"),
    width: wp("4%"),
  },
  bottomViewContainer: {
    flexDirection: "row",
    flex: 1,
  },
  labelsContainer: {
    width: "20%",
    alignItems: flexStart,
    justifyContent: flexStart,
    color: Colors.darkNavy,
  },
  labelsValue: {
    textAlign: "left",
    fontSize: hp("1.9%"),
    marginBottom: wp("2.5%"),
    marginLeft: wp("6%"),
    width: "90%",
    color: Colors.darkNavy,
  },
  otherDataContainer: {
    width: "100%",
    alignItems: flexStart,
    justifyContent: flexStart,
  },
  detailsValueBold: {
    textAlign: "left",
    fontSize: hp("2.0%"),
    marginLeft: wp("5%"),
    marginBottom: wp("2%"),
    fontWeight: "normal",
    color: Colors.darkNavy,
  },

  shareButtonContainer: {
    width: wp("58"),
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  //Allotments Style Section

  outerContainer: {
    marginHorizontal: wp("7"),
    marginTop: wp("5"),
  },
  firstContainer: {
    width: "40%",
  },
  secondContainer: {
    width: "35%",
  },
  thirdContainer: {
    width: "35%",
  },
  label: {
    fontSize: hp("2.1%"),
    color: Colors.darkNavy,
  },
  information: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    color: Colors.darkNavy,
  },
  columnContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: wp("4%"),
  },
});
