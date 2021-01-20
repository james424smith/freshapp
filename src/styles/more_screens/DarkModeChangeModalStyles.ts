import { StyleSheet, Dimensions } from "react-native";
import colors from "../../constants/styles/colors";

const { width, height } = Dimensions.get("window");
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  touchableOpacityStyles: {
    borderTopWidth: 1,
    borderTopColor: colors.modalColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.modalColor,
  },
  main: {
    width: width,
    height: height * 0.6,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  darkModeTextView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.modalColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.darkModeModalColorText,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: colors.darkModeModalColorText,
  },
  contentItem: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.darkModeModalContentItem,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.modalColor,
  },
  item: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.modalColor,
    borderBottomWidth: 1,
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    color: colors.white,
  },
  systemText: { color: colors.inactiveGrey, fontSize: 13 },
  systemTextView: {
    width: wp("90%"),
    marginLeft: wp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
