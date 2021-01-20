import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  shoesTitle: {
    fontWeight: "bold",
    fontSize: hp("2.5%"),
    textAlign: "left",
    color: Colors.white,
  },
  clothesTitle: {
    fontWeight: "700",
    fontSize: hp("2.5%"),
    textAlign: "left",
    marginLeft: wp("6%"),
    marginTop: wp("6%"),
    marginBottom: wp("6%"),
    color: Colors.darkNavy,
  },
  detailsValueLarge: {
    textAlign: "left",
    fontSize: hp("1.7%"),
    marginHorizontal: wp("6%"),
    fontWeight: "700",
    marginBottom: wp("3%"),
    color: Colors.darkNavy,
  },
  detailsValueSmall: {
    textAlign: "left",
    fontSize: hp("1.5%"),
    marginLeft: wp("6%"),
    marginRight: wp("6%"),
    marginBottom: wp("3%"),
  },
  dateValueSmall: {
    textAlign: "left",
    fontSize: hp("1.5%"),
    marginLeft: wp("6%"),
  },
  labelsValueBold: {
    textAlign: "left",
    fontSize: hp("1.7%"),
    marginLeft: wp("6%"),
    marginBottom: wp("3%"),
  },
  headingStyle: {
    height: hp("6%"),
  },
  dataHeading: {
    fontSize: hp("2%"),
    textAlign: "center",
    color: Colors.marlowBlue,
  },
  dataRow: {
    height: hp("4.3%"),
    margin: wp("1.8%"),
    fontSize: hp("1.9%"),
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.marlowBlue,
  },
  moreDetailsContainer: {
    flexDirection: "row",
    flex: 1,
  },
  tableBorderStyle: {
    borderWidth: 0.5,
    borderColor: Colors.marlowBlue,
  },
  tableFillStyle: {
    backgroundColor: Colors.white,
    borderRadius: 2,
    borderBottomEndRadius: 0.5,
    borderBottomRightRadius: 0.5,
  },
  tableContainer: {
    marginTop: wp("6%"),
    marginBottom: wp("6%"),
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginVertical: wp("6%"),
  },
  clothesContainer: {
    paddingTop: wp("3%"),
  },
  shoesContainer: {
    backgroundColor: Colors.marlowBlue,
  },
  clotheDataList: {
    paddingTop: wp("6%"),
  },
  moreDetailsValues: {
    width: "80%",
  },
  clotheLabels: {
    width: "20%",
  },
  itemContainer: {
    marginBottom: wp("6%"),
  },
  clotheItemView: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
    backgroundColor: Colors.lightGrey,
  },
  DataContainerRoot: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  tableMarginsStyle: {
    margin: wp("6%"),
  },
});
