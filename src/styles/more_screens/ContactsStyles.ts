import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  horizontalScrollViewContainer: {
    borderBottomWidth: 0.7,
    borderColor: Colors.grey,
  },
  root: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonStyle: {
    alignItems: "center",
    padding: wp("6%"),
    alignSelf: "stretch",
    textAlign: "center",
  },
  activeTouchableOpacityLabel: {
    fontSize: hp("2%"),
    color: Colors.aquamarine,
    borderBottomWidth: 2,
    borderBottomColor: Colors.aquamarine,
  },
  inactiveTouchableOpacityLabel: {
    fontSize: hp("2%"),
    color: Colors.grey,
    opacity: 0.5,
    fontWeight: "600",
  },
  activeOpacity: {
    opacity: 1,
  },
  inactiveOpacity: {
    opacity: 0.5,
  },
  textButton: {
    color: Colors.aquamarine,
    fontSize: hp("2%"),
    fontWeight: "600",
    justifyContent: "space-around",
  },
});
