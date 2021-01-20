import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollbar: {
    flexGrow: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  localTimeView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: wp("8%"),
    alignItems: "center",
  },
  detailsLabel: {
    fontSize: hp("1.7%"),
    marginTop: wp("8%"),
    marginHorizontal: wp("8%"),
  },
  detailsValue: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    color: Colors.darkNavy,
  },
  detailsValueManager: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    color: Colors.darkNavy,
    marginHorizontal: wp("8%"),
  },
  detailsValueU: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginTop: wp("0.3%"),
    marginHorizontal: wp("8%"),
    textDecorationLine: "underline",
    color: Colors.darkNavy,
  },
  lineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginTop: wp("8%"),
  },
  firstLineStyle: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.3,
    marginTop: wp("4%"),
  },
  flexView: {
    flex: 1,
    flexDirection: "row",
  },
  firstContainer: {
    width: "15%",
    marginLeft: wp("8%"),
    marginTop: wp("4%"),
  },
  secondContainer: {
    width: "85%",
  },
  columnContainer: {
    width: "50%",
  },
  endSpace: {
    marginBottom: "10%",
  },
  avatarStyle: {
    borderWidth: 2.5,
    borderColor: "white",
    borderRadius: 50,
  },
  avatarContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarViewStyle: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 50,
  },
});
