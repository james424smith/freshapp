import { StyleSheet } from "react-native";
import Layout from "../../constants/styles/Layout";

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollViewStyles: {
    flex: 1,
  },
  scrollViewContainerStyles: {
    flexGrow: 1,
  },
  img: {
    flex: 1,
    width: Layout.window.width,
  },
});
