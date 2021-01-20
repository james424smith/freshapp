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
  },
  textContainer: {
    margin: wp("5%"),
    alignSelf: "center",
  },
  svgContainer: {
    alignSelf: "center",
    margin: wp("4%"),
  },
  title: {
    color: Colors.darkNavy,
    fontWeight: "bold",
    fontSize: hp("3.5%"),
    textAlign: "center",
    marginBottom: wp("3%"),
  },
  buttonContainer: {
    margin: wp("7%"),
  },
  paragraph: {
    color: Colors.darkNavy,
    fontSize: hp("2.3%"),
    textAlign: "center",
  },
  questionnaireButton: {
    height: hp("8.5%"),
    width: wp("90%"),
    backgroundColor: Colors.marlowBlue,
    borderRadius: 50,
    marginHorizontal: wp("15%"),
    marginBottom: wp("3%"),
  },
  textOnQuestionnaireButton: {
    fontSize: hp("2.6%"),
    color: Colors.white,
  },
  supportTeamButton: {
    height: hp("8.5%"),
    width: wp("90%"),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.marlowBlue,
    borderRadius: 50,
    marginHorizontal: wp("15%"),
  },
  textOnSupportTeamButton: {
    fontSize: hp("2.6%"),
    fontWeight: "bold",
    color: Colors.marlowBlue,
  },
  linkStyle: {
    backgroundColor: "transparent",
  },
  linkContainer: {
    marginTop: wp("2%"),
  },
});

export default styles;
