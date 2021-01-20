import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  textContainer: {
    margin: wp("20%"),
    alignSelf: "center",
  },
  title: {
    color: Colors.darkNavy,
    fontWeight: "bold",
    fontSize: hp("2.5%"),
    textAlign: "center",
    marginBottom: wp("3%"),
  },
  versionNumber: {
    fontSize: hp("2.0%"),
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.inactiveGrey,
    marginBottom: wp("10%"),
  },
  darkModeParagraph: {
    fontSize: hp("2.3%"),
    textAlign: "center",
    color: Colors.inactiveGrey,
  },
});

export default styles;
