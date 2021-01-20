import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const flexStart = "flex-start";

export const arrowHeight = 20;
export const arrowWidth = 20;

export default StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  textButton: {
    color: Colors.aquamarine,
    fontSize: hp("1.6%"),
  },
  serviceDataContainer: {
    flex: 1,
    marginLeft: wp("8%"),
    marginRight: wp("15%"),
  },
  arrowContainer: {
    width: "10%",
    marginTop: wp("6%"),
    marginLeft: wp("6%"),
    marginRight: wp("6%"),
  },
  nonMarlowArrowContainer: {
    width: "10%",
    marginLeft: wp("6%"),
    marginRight: wp("6%"),
    marginTop: wp("3%"),
  },
  labelsContainer: {
    width: "20%",
    alignItems: flexStart,
    justifyContent: flexStart,
  },
  otherDataContainer: {
    width: "80%",
    alignItems: flexStart,
    justifyContent: flexStart,
  },
  bottomViewContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: wp("8%"),
  },
  portValueBold: {
    textAlign: "left",
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    marginBottom: wp("3%"),
    color: Colors.darkNavy,
  },
  detailsValueBold: {
    textAlign: "left",
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    marginBottom: wp("2%"),
    color: Colors.darkNavy,
  },
  dateValueSmall: {
    textAlign: "left",
    fontSize: hp("1.5%"),
    marginTop: wp("3%"),
  },
  dateValueBold: {
    textAlign: "left",
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    marginTop: wp("3%"),
    marginBottom: wp("6%"),
    color: Colors.darkNavy,
  },
  labelsValue: {
    textAlign: "left",
    fontSize: hp("1.5%"),
    marginBottom: wp("3%"),
  },
  rightContainer: {
    width: "50%",
    alignItems: flexStart,
    justifyContent: flexStart,
  },
  topViewContainer: {
    flexDirection: "row",
    flex: 1,
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    marginTop: wp("6%"),
    marginBottom: wp("6%"),
  },
  stableLineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    marginTop: wp("8%"),
  },
  seaServiceContainer: {
    paddingTop: wp("3%"),
  },
  leftContainer: {
    width: "40%",
  },
  DataContainerRoot: {
    flex: 1,
  },
  opacitiesView: {
    flex: 1,
    marginTop: wp("8%"),
  },
});
