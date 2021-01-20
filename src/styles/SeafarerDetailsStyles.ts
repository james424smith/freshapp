import { StyleSheet } from "react-native";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  getStartedContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  label: {
    fontSize: hp("1.7%"),
  },
  information: {
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  idStyle: {
    textAlign: "center",
    fontSize: hp("2%"),
    marginBottom: wp("8%"),
  },
  informationBold: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
    marginTop: wp("6%"),
  },
  basicDataView: {
    backgroundColor: Colors.lightGrey,
    marginBottom: wp("6%"),
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    width: "60%",
    justifyContent: "flex-end",
    marginTop: wp("8%"),
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginTop: wp("6%"),
    marginBottom: wp("6%"),
  },
  endSpace: {
    marginBottom: "30%",
  },
  columnContainer: {
    flex: 1,
    flexDirection: "row",
  },
  firstContainer: {
    width: "45%",
  },
  secondContainer: {
    width: "40%",
  },
  thirdContainer: {
    width: "15%",
  },
  halfContainer: {
    width: "55%",
  },
  fullContainer: {
    marginVertical: wp("1%"),
  },
  half2Container: {
    width: "45%",
  },
  avatarStyle: {
    borderWidth: 2.5,
    borderColor: "white",
    borderRadius: 50,
  },
  avatarViewStyle: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 50,
  },
  outerContainer: {
    marginHorizontal: wp("8%"),
  },
  badgeContainer: {
    width: "40%",
    marginTop: wp("3%"),
    paddingLeft: wp("6%"),
  },
  iconsView: {
    flex: 1,
    flexDirection: "row",
  },
  NoKview: {
    marginTop: wp("6%"),
    backgroundColor: Colors.lightGrey,
  },
  spaceBetweenSections: {
    marginTop: wp("4%"),
  },
  NoKtitle: {
    fontSize: hp("2.3%"),
    fontWeight: "bold",
    paddingBottom: wp("8%"),
    paddingTop: wp("8%"),
  },
  NoKvalueSpace: {
    marginBottom: wp("4%"),
  },
});
