import { StyleSheet } from "react-native";
import colors from "../../constants/styles/colors";

export default StyleSheet.create({
  mainStyle: {
    alignSelf: "stretch",
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
  },
  iconStyle: {
    backgroundColor: colors.grey,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: colors.inactiveGrey,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.black,
  },
  contentContainer: {
    flexDirection: "row",
  },
  rightIcon: {
    color: colors.darkInputText,
  },
});
