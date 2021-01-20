import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  wrapper: {},

  slide: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
  },

  dotStyles: {
    backgroundColor: "rgba(255,255,255,.3)",
    width: wp("1.6%"),
    height: hp("0.9%"),
    borderRadius: 7,
    marginLeft: wp("1%"),
    marginRight: wp("1%"),
    bottom: hp("41%"),
    left: wp("38"),
  },
  activeDotStyles: {
    backgroundColor: Colors.white,
    width: wp("1.6%"),
    height: hp("0.9%"),
    borderRadius: 7,
    marginLeft: wp("1%"),
    marginRight: wp("1%"),
    bottom: hp("41%"),
    left: wp("38"),
  },
  paginationStyles: { top: 0 },
});

export default styles;
