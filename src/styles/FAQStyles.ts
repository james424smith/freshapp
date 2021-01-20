import { StyleSheet } from "react-native";
import colors from "../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const justifyContent = "space-between";

export default StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center",
  },

  dividerStyles: {
    marginVertical: 5,
    height: 1,
    width: "100%",
    backgroundColor: "#CEDCCE",
  },
  header: {
    flex: 0.3,
    backgroundColor: colors.marlowBlue,
  },
  headerContent: {
    flex: 1,
    marginHorizontal: 20,
  },
  content: {
    flex: 0.65,
    marginTop: 10,
    marginLeft: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent,
    alignItems: "center",
    height: hp("5%"),
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("10%"),
    paddingTop: hp("2%"),
  },
  icon: {
    backgroundColor: colors.darkBlue,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  faqsText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "bold",
  },
  faqView: {
    flexDirection: "row",
    justifyContent,
    alignItems: "center",
    width: wp("55%"),
  },
  faqsTextLogIn: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  faqViewLogIn: {
    flexDirection: "row",
    justifyContent,
    alignItems: "center",
    width: wp("75%"),
    paddingTop: hp("2%"),
  },
  headerMiddle: {
    paddingTop: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp("6%"),
  },
  input: {
    fontSize: 14,
    flexDirection: "row",
    color: colors.FAQTextColor,
    alignSelf: "center",
    alignContent: "center",
  },
  inputBoxStyle: {
    backgroundColor: colors.inputSearchBackgroundColor,
    borderRadius: 30,
    height: hp("6%"),
    width: wp("70%"),
    alignContent: "center",
  },
  placeholderTextColor: {
    color: colors.grey,
  },
  removeUnderline: {
    borderBottomWidth: 0,
    zIndex: 1,
    flexDirection: "row",
    height: hp("6%"),
  },
  placeHolderText: {
    color: colors.black,
    alignItems: "center",
  },
  headerTitleStyleFAQ: {
    fontWeight: "bold",
    backgroundColor: colors.marlowBlue,
  },
  headerBottom: {},
  flatlist: {},
  tabItem: {
    paddingBottom: 5,
  },
  tabNameText: {
    fontSize: 16,
    color: colors.FAQInactiveColor,
    fontWeight: "bold",
  },
  selectedTabItem: {
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
  selectedTabItemDarkMode: {
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.turquoise,
  },
  selectedTabNameTextDarkMode: {
    fontSize: 16,
    color: colors.turquoise,
    fontWeight: "bold",
  },
  selectedTabNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  questionPress: {
    borderBottomColor: colors.inactiveGrey,
    borderBottomWidth: 0.3,
    paddingVertical: 20,
  },
  questionView: {
    flexDirection: "row",
    justifyContent,
    marginLeft: wp("3%"),
    marginRight: wp("4%"),
  },
  answerView: {
    flexDirection: "row",
    marginLeft: wp("3%"),
    marginRight: wp("6%"),
  },
  questionText: {
    fontWeight: "bold",
    color: colors.FAQTextColor,
    fontSize: 14,
    width: wp("80%"),
  },
  answerText: {
    color: colors.FAQTextColor,
    fontSize: 14,
    paddingTop: hp("3%"),
    marginRight: wp("7%"),
  },
  queryQuestionBox: {
    top: hp("16%"),
    position: "absolute",
    flexDirection: "row",
    width: wp("85%"),
    flex: 1,
    height: hp("10%"),
  },
  queryQuestionView: {
    flexGrow: 1,
    flexWrap: "wrap",
    paddingVertical: hp("1%"),
  },
  queryQuestionViewOfNotFound: {
    flexGrow: 1,
    flexWrap: "wrap",
    paddingVertical: hp("1%"),
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("3%"),
  },
  queryAnswerTitleTextOfNotFound: {
    color: colors.black,
    marginHorizontal: wp("3%"),
    fontSize: 14,
    paddingTop: hp("1%"),
    fontWeight: "bold",
    height: hp("5%"),
  },
  queryAnswerText: {
    color: colors.black,
    marginHorizontal: wp("3%"),
    fontSize: 14,
    paddingTop: hp("1%"),
  },
  safeAreaContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: wp("85%"),
    shadowColor: colors.inactiveGrey,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
