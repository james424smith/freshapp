import Layout from "../constants/styles/Layout";
import { StyleSheet } from "react-native";
import Colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const mainIconSize = wp("7%");
export const logoWidthSize = hp("30%");
export const logoHeightSize = hp("30%");
const spaceBetween = "space-between";

export default StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  cancelLinkContainer: {
    paddingTop: hp("4%"),
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  centerInputText: {
    marginTop: -5,
  },
  passwordValidationWrapper: {
    flex: 0.2,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: Layout.window.width,
    height: Layout.window.height,
    justifyContent: "center",
    alignItems: "center",
  },
  loginView: {
    marginTop: wp("20%"),
    flex: 1,
  },
  loginTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpView: {
    flex: 1,
    justifyContent: spaceBetween,
  },
  signUpTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    width: Layout.window.width,
  },
  signUpText: {
    fontSize: hp("4%"),
    fontWeight: "700",
    color: Colors.white,
  },
  forgotPasswordTitle: {
    fontSize: hp("4%"),
    fontWeight: "700",
    color: Colors.white,
  },
  resetPasswordText: {
    fontSize: hp("4%"),
    fontWeight: "700",
    color: "white",
  },
  enterEeIdText: {
    fontSize: hp("3.2%"),
    fontWeight: "400",
    alignSelf: "center",
    color: "black",
  },
  passwordTitle: {
    fontSize: hp("3.2%"),
    fontWeight: "400",
    alignSelf: "center",
    color: "black",
  },
  loginInput: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: wp("8%"),
  },
  newPasswordInput: {
    justifyContent: "center",
    marginTop: hp("10%"),
    flex: 1,
  },
  firstPasswordInput: {
    justifyContent: "center",
  },
  employeeIdInputContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: hp("-50%"),
  },
  passwordsInputContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: wp("50%"),
  },
  signUpInput: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  linearGradient: {
    flex: 1,
    width: Layout.window.width,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  forgotPasswordLayout: {
    flex: 1,
    justifyContent: spaceBetween,
  },
  skipContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    paddingTop: hp("3%"),
  },
  skipButton: {
    justifyContent: spaceBetween,
    alignItems: "flex-end",
    padding: wp("3%"),
  },
  resetPasswordLayout: {
    flex: 1,
    justifyContent: spaceBetween,
  },
  belowSignInView: {
    marginTop: wp("6%"),
    marginBottom: wp("25%"),
  },
  registerText: {
    color: Colors.grey,
    fontSize: hp("1.7%"),
  },
  privacyPolicyView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  privacyPolicyLink: {
    color: Colors.grey,
    textDecorationLine: "underline",
    fontSize: hp("1.7%"),
  },
  termsConditionsView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  forgotPasswordTermsConditionsContainer: {
    paddingBottom: hp("3%"),
  },
  termsConditionsLink: {
    color: Colors.grey,
    textDecorationLine: "underline",
    fontSize: hp("1.7%"),
  },
  checkBoxContainerStyle: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  andBetweenStyle: {
    color: Colors.grey,
    fontSize: hp("1.7%"),
  },
  conditionsPrivacyPolicyLinks: {
    flex: 1,
  },
  newsLinkView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  newsLink: {
    color: Colors.grey,
    textDecorationLine: "underline",
  },
  imprintLinkContainer: {
    flex: 1,
  },
  imprintLinkView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imprintLink: {
    color: Colors.grey,
    textDecorationLine: "underline",
  },
  bottomLink: {
    fontSize: hp("1.8%"),
    color: "black",
    textAlign: "center",
  },
  bottomButtonArea: {
    width: "50%",
  },
  touchableOpacityStyle: {
    width: "100%",
    height: hp("12.5%"),
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.grey,
    borderWidth: 0.5,
  },
  footerStyle: {
    position: "absolute",
    bottom: 0,
    width: Layout.window.width,
    height: hp("6.5%"),
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  scrollViewStyle: {
    flex: 1,
  },
  scrollViewContainerStyles: {
    flex: 1,
  },
  enterEeIdTitleContainer: {
    marginTop: wp("20%"),
  },
  logoContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginVertical: hp("10%"),
  },
  logoText: { fontSize: hp("4%"), color: Colors.white, fontWeight: "bold" },
  signUpTitleContainer: {
    alignItems: "center",
    alignSelf: "center",
  },
  forgotPasswordTitleContainer: {
    alignItems: "center",
    alignSelf: "center",
  },
  resetForgotPasswordTitleContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp("1%"),
  },
  credentialsContainer: {
    flex: 1,
    marginHorizontal: wp("8%"),
  },
  signUpCredentialsContainer: {
    marginHorizontal: wp("8%"),
    marginBottom: wp("6%"),
  },
  forgotPasswordCredentialsContainer: {
    justifyContent: "center",
    marginHorizontal: wp("10%"),
  },
  forgotPasswordEmployeeText: {
    color: Colors.white,
    marginLeft: wp("3%"),
    marginBottom: wp("2%"),
    fontSize: hp("1.8%"),
  },
  accountVerificationEmployeeText: {
    marginLeft: wp("4"),
    marginBottom: wp(".5%"),
    fontSize: hp("1.8%"),
  },
  accountVerificationPasswordText: {
    color: Colors.white,
    marginLeft: wp("4"),
    fontSize: hp("1.7%"),
  },
  inputBoxStyle: {
    backgroundColor: Colors.inputSearchBackgroundColor,
    borderRadius: 30,
    height: hp("6.5%"),
    alignItems: "center",
    marginBottom: wp("3%"),
  },
  inputBoxStyleForgotPassword: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    height: hp("6.5%"),
    alignItems: "center",
    marginVertical: wp("3%"),
  },
  inputValueStyle: {
    fontSize: hp("2.2%"),
    marginLeft: wp("3%"),
    color: "black",
    fontFamily: "Roboto-Regular",
    flexDirection: undefined,
    width: Layout.window.width * 0.8,
  },
  dateOfBirthInputStyles: {
    fontSize: hp("2.2%"),
    marginLeft: wp("3%"),
    color: "black",
    width: Layout.window.width * 0.8,
    opacity: 0.5,
  },
  disableOpacity: {
    opacity: 1,
  },
  labelValueStyle: {
    fontSize: hp("2.2%"),
    marginLeft: wp("3%"),
    color: "black",
    width: Layout.window.width * 0.8,
  },
  removeUnderline: {
    borderBottomWidth: 0,
    zIndex: 1,
  },
  signInButton: {
    height: hp("6.7%"),
    backgroundColor: Colors.marlowBlue,
    borderRadius: 30,
    marginHorizontal: wp("10%"),
    marginBottom: hp("2%"),
  },
  signUpButton: {
    height: hp("7.5%"),
    backgroundColor: Colors.marlowBlue,
    borderRadius: 25,
    marginBottom: hp("2%"),
  },
  signInButtonView: {
    marginVertical: wp("6%"),
  },
  signUpButtonView: {
    width: "100%",
    marginVertical: wp("6%"),
  },
  textOnButton: {
    fontSize: hp("2.3%"),
    color: Colors.white,
  },
  signUpLink: {
    color: Colors.white,
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  cancelLink: {
    fontSize: hp("2%"),
    color: Colors.darkNavy,
  },
  forgotPasswordLink: {
    color: Colors.grey,
    fontSize: hp("2%"),
  },
  linkStyle: {
    backgroundColor: "transparent",
  },
  spaceContainer: {
    marginBottom: wp("18%"),
  },
  dateIconStyle: {
    position: "absolute",
    right: wp("2%"),
    marginRight: 0,
  },
  dateInputStyle: {
    alignItems: "flex-start",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStartRadius: -15,
    marginLeft: wp("3%"),
    width: Layout.window.width * 0.8,
  },
  placeholderStyle: {
    color: Colors.grey,
    fontSize: hp("2.2%"),
    marginLeft: wp("3%"),
  },
  dateTextStyle: {
    fontSize: hp("2%"),
    marginLeft: wp("3%"),
  },
  datePickerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    width: wp("80%"),
    height: hp("6.5%"),
    alignItems: "center",
  },
  termsOnFooter: {
    flex: 1,
  },
  navigationIconsCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: wp("4%"),
  },
  passwordMessageContainer: {
    alignItems: "center",
  },
  passwordValidationSection: {
    flex: 1,
  },
  passwordValidationMapChecks: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  passwordValidationContainer: {
    flex: 1,
    flexDirection: "row",
    width: wp("80%"),
    flexWrap: "wrap",
    justifyContent: spaceBetween,
  },
  passwordValidationCheckIcon: {
    width: wp("10%"),
    alignItems: "center",
  },

  passwordValidationCheckedIconText: {
    color: Colors.green,
    width: wp("70%"),
    alignSelf: "center",
  },
  passwordValidationUncheckedIconText: {
    color: Colors.grey,
    width: wp("70%"),
    alignSelf: "center",
  },

  passwordMainMessage: {
    fontSize: hp("1.8%"),
    color: Colors.grey,
    fontWeight: "bold",
  },
  passwordBulletMessage: {
    fontSize: hp("1.8%"),
    color: Colors.grey,
  },
  signUpLoginView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpLoginText: {
    fontSize: hp("1.9%"),
    color: Colors.white,
  },
  signUpLoginLink: {
    color: Colors.white,
    textDecorationLine: "underline",
    textDecorationColor: Colors.white,
    fontSize: hp("1.9%"),
    fontWeight: "bold",
  },
  goBackContainer: {
    alignItems: "flex-start",
    paddingTop: hp("5%"),
  },
  exitButtonContainer: { alignItems: "flex-end", paddingTop: hp("2.5%") },
  errorMessageContainer: { paddingLeft: wp("5%") },
  errorMessageText: { color: Colors.white, fontSize: hp("1.5%") },
});
