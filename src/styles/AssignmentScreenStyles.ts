import { StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  employmentOfferText: {
    color: Colors.grey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    marginRight: wp("4%"),
    fontSize: wp("3%"),
    alignSelf: "flex-end",
  },
  employmentOfferContainer: {
    marginTop: wp("5%"),
    marginBottom: wp("5%"),
  },
  outerContainer: {
    backgroundColor: Colors.lightGrey,
  },
  vesselImageStyle: {
    flex: 1,
    width: undefined,
    height: hp("26%"),
  },
  vesselDetails: {
    flexBasis: "40%",
    margin: wp("4%"),
  },
  vesselTitle: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    marginHorizontal: wp("4%"),
    flexBasis: "40%",
    color: Colors.darkNavy,
  },
  authLoadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTouchableOpacity: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkNavy,
  },
  inactiveTouchableOpacity: {
    opacity: 1,
  },
  assignmentTopContainerColor: {
    backgroundColor: Colors.lightGrey,
  },
  nextAvailabilityLabel: {
    fontSize: hp("1.5%"),
    color: Colors.grey,
    textAlign: "center",
  },
  nextAvailabilityValue: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    color: Colors.darkNavy,
    textAlign: "center",
  },
  touchableOpacityContainer: {
    backgroundColor: Colors.lightGrey,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  assignmentTopContainerAlignment: {
    margin: wp("8%"),
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  availabilityDateContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  //CURRENTLY NOT USED
  activeTouchableOpacityLabel: {
    fontSize: 15,
    color: Colors.darkNavy,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  //CURRENTLY NOT USED
  inactiveTouchableOpacityLabel: {
    fontSize: 14,
    color: Colors.darkNavy,
    opacity: 0.2,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  row: {
    marginTop: wp("4.5%"),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  joiningDateItem: {
    marginTop: wp("4%"),
    margin: wp("2%"),
    flexBasis: "45%",
    height: hp("12%"),
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.aquamarine,
  },
  endOfContractItem: {
    marginTop: wp("4%"),
    margin: wp("2%"),
    flexBasis: "45%",
    height: hp("12%"),
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.green,
  },
  secondaryItem: {
    backgroundColor: Colors.lightGrey,
    marginTop: wp("2%"),
    marginBottom: wp("2%"),
    margin: wp("2%"),
    flexBasis: "45%",
    height: hp("12%"),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  vesselTrackerCircle: {
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.08,
    height: Dimensions.get("window").width * 0.08,
  },
  vesselDetailsLabel: {
    color: Colors.grey,
    fontSize: hp("1.8%"),
  },
  vesselDetailsValue: {
    color: Colors.darkNavy,
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  textLabel: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.aquamarine,
    fontSize: hp("1.8%"),
  },
  textValue: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.aquamarine,
    fontSize: hp("2.8%"),
    fontWeight: "bold",
  },
  textLabelOfEOC: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.green,
    fontSize: hp("1.8%"),
  },
  textValueOfEOC: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.green,
    fontSize: hp("2.8%"),
    fontWeight: "bold",
  },
  secondaryTextLabel: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.grey,
    fontSize: hp("1.8%"),
  },
  secondaryTextValue: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.darkNavy,
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  cargoDetailsContainerAlignment: {
    paddingTop: wp("3%"),
    backgroundColor: Colors.lightGrey,
  },
  cargoDataContainer: {
    margin: wp("5%"),
  },
  cargoTitle: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    flexBasis: "90%",
    color: Colors.darkNavy,
  },
  cargoItemLabel: {
    fontSize: hp("1.8%"),
    paddingRight: wp("3%"),
    color: Colors.grey,
  },
  cargoItemValue: {
    color: Colors.darkNavy,
    fontSize: hp("2%"),
    fontWeight: "bold",
    maxWidth: "80%",
  },
  cargoLineStyle: {
    flexDirection: "row",
  },
  avatarStyle: {
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 40,
  },
  avatarViewStyle: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 40,
  },
  columnsContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: wp("5.5%"),
  },
  firstContainerWidth: {
    width: "55%",
  },
  secondContainerWidth: {
    width: "45%",
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginTop: wp("3%"),
    marginBottom: wp("6%"),
    marginLeft: wp("5%"),
  },
  vesselDetailsContainer: {
    marginTop: wp("10%"),
  },
});
