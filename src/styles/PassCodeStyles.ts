import { StyleSheet } from "react-native";
import Colors from "../constants/styles/colors";
import Layout from "../constants/styles/Layout";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: hp("4%"),
  },
  passcodeRender: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
  },
  swipeToUnlockView: {
    flex: 0.2,
    justifyContent: "center",
    flexDirection: "row",
  },
  swipeToUnlockText: {
    fontSize: 18,
    color: Colors.white,
    marginLeft: 5,
  },
  enterPasscodeView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  enterPasscodeText: {
    fontSize: 18,
    color: Colors.white,
  },
  emptyCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.inactiveGrey,
    marginLeft: 15,
    marginRight: 15,
  },
  lockedEmptyCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.inactiveGrey,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: Colors.inactiveGrey,
  },
  filledCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: Colors.white,
  },
  circleView: {
    flexDirection: "row",
    marginTop: 15,
  },
  countDownView: {
    flex: 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  countDownText: {
    fontSize: 14,
    color: Colors.white,
  },
  numbersView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  numberButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: Layout.window.width * 0.22,
    height: Layout.window.width * 0.22,
    borderRadius: Math.round(Layout.window.width + Layout.window.height) / 2,
    margin: 8,
  },
  numberText: {
    fontSize: 28,
    color: Colors.white,
  },
  lockedNumberText: {
    fontSize: 28,
    color: Colors.inactiveGrey,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  forgotPasswordView: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: Colors.white,
  },
  lockedPasswordTimerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  lockedPasswordTimerText: {
    fontSize: wp("3.5%"),
    color: Colors.white,
    textAlign: "center",
  },
});
