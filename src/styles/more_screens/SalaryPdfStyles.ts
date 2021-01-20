import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  root: {
    flex: 1,
    margin: 10,
  },
  container: { alignSelf: "center", marginTop: 50 },
  scrollViewContainer: {
    flexGrow: 1,
  },
  centerIndicator: {
    flex: 1,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
