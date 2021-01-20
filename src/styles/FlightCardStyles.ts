import { StyleSheet } from "react-native";
import { cardHeight } from "../constants/styles/FlightCardConstants";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  mainBackgroundContainer: {
    flex: 1,
    backgroundColor: Colors.marlowBlue,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: Colors.marlowBlue,
  },
  scrollViewContainer: {
    flexGrow: 1,
    height: "100%",
  },
  planeImgOnTop: {
    alignSelf: "center",
    paddingVertical: wp("8%"),
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: wp("3px"),
    marginVertical: hp("5%"),
  },
  boldDetails: {
    color: Colors.black,
    fontSize: hp("1.7%"),
    maxWidth: "100%",
  },
  flightNumberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  boldDetailsCancel: {
    color: "red",
    fontSize: hp("1.7%"),
    maxWidth: "100%",
  },
  textOtherLabel: {
    color: Colors.grey,
    fontSize: hp("1.7%"),
    paddingTop: wp("4.5%"),
  },
  firstColumnDetails: {
    width: "50%",
  },
  secondColumnDetails: {
    width: "50%",
  },
  rightHalfCircle: {
    zIndex: 0.5,
    overflow: "hidden",
    width: wp("7%"),
    height: hp("3.5%"),
    position: "absolute",
    right: wp("-3.5%"),
    borderTopLeftRadius: 150,
    borderBottomLeftRadius: 150,
    backgroundColor: Colors.marlowBlue,
  },
  leftHalfCircle: {
    zIndex: 0.5,
    overflow: "hidden",
    width: wp("7.2%"),
    height: hp("3.5%"),
    position: "absolute",
    left: wp("-3.7%"),
    borderTopRightRadius: 150,
    borderBottomRightRadius: 150,
    backgroundColor: Colors.marlowBlue,
  },
  dashLineStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: wp("15%"),
    width: undefined,
    height: 1,
  },
  timeStyle: {
    paddingTop: wp("3%"),
    fontSize: hp("3%"),
    textAlign: "center",
    color: Colors.black,
  },
  ticketClass: {
    marginTop: "30%",
    backgroundColor: Colors.lightGrey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: Colors.darkNavy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    height: cardHeight,
    marginVertical: wp("3%"),
  },
  textAirportName: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.black,
  },
  dashView: {
    width: "10%",
  },
  dashStyle: {
    textAlign: "center",
    fontSize: hp("5.5%"),
    color: Colors.marlowBlue,
  },
  textAirportCode: {
    color: Colors.black,
    fontSize: hp("5.5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  airportDataView: {
    width: "45%",
  },
  textDepArrLabel: {
    color: Colors.grey,
    fontSize: hp("1.7%"),
  },
  textTime: {
    fontSize: hp("1.5%"),
    textAlign: "center",
  },
  dashViewStyle: {
    width: "100%",
    marginTop: wp("3.2%"),
  },
  ticketLine: {
    flexDirection: "row",
  },
});
