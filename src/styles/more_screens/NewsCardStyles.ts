import { StyleSheet } from "react-native";
import Colors from "../../constants/styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const stylesheet = `<head>
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
	<style>
        body {
            font-family: 'Roboto';
        }

        p {
            font-size: 30;
            font-family: 'Roboto';
        }

        li {
            font-size: 25;
            font-family: 'Roboto';
        }
    </style>
<head>`;

export default StyleSheet.create({
  //Box for news
  newsContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    shadowColor: Colors.darkNavy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: wp("3%"),
    paddingLeft: wp("3%"),
    marginBottom: wp("5%"),
    marginLeft: wp("3%"),
  },
  img: {
    height: hp("35%"),
    width: "100%",
    marginBottom: wp("2%"),
  },
  //title for latest press releases
  titleHeader: {
    color: Colors.darkNavy,
    fontWeight: "bold",
    fontSize: hp("2.2%"),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%"),
    marginTop: wp("3.2%"),
    paddingBottom: wp("1%"),
    minHeight: hp("5.5%"),
  },
  summaryText: {
    fontSize: hp("2%"),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%"),
    color: Colors.darkNavy,
  },

  //General Title
  mainHeader: {
    color: Colors.white,
    fontWeight: "bold",
    lineHeight: hp("4%"),
    fontSize: hp("2.8%"),
    paddingTop: wp("2%"),
    paddingRight: wp("2%"),
    paddingBottom: wp("2%"),
    paddingLeft: wp("3%"),
    justifyContent: "center",
  },
  //General Box
  container: {
    backgroundColor: Colors.marlowBlue,
    paddingTop: wp("2%"),
    paddingRight: wp("2%"),
    paddingBottom: wp("2%"),
    paddingLeft: wp("2%"),
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
  },
  //read more text
  readMoreText: {
    color: Colors.aquamarine,
    fontSize: hp("2%"),
    paddingRight: wp("4%"),
    marginTop: wp("5%"),
    textAlign: "right",
  },
  flexView: {
    flex: 1,
  },
  textMargin: {
    margin: wp("5%"),
  },
  opacityStyle: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    shadowColor: Colors.grey,
    backgroundColor: Colors.white,
    elevation: 5,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  opacitiesContainer: {
    flex: 1,
    marginTop: wp("4%"),
  },

  endOfScrollView: {
    height: hp("8%"),
  },

  scrollViewContentContainer: {
    flexGrow: 1,
  },
  //List of Press Releases and Newsletters

  //Container
  prenewsListContainer: {
    backgroundColor: Colors.white,
    marginTop: wp("5%"),
    marginLeft: wp("3.5%"),
    marginRight: wp("3.5%"),
    width: "93%",
    flex: 1,
  },
  //title style - second section
  prenewsHeader: {
    color: Colors.darkNavy,
    fontWeight: "bold",
    fontSize: hp("2.2%"),
    marginTop: wp("2.1%"),
    paddingBottom: wp("2%"),
  },

  prenewssummary: {
    color: Colors.darkNavy,
    fontSize: hp("2%"),
    marginBottom: wp("4%"),
  },
  //WebRender style "html"
  containerWebRender: {
    paddingTop: wp("5%"),
    paddingRight: wp("3%"),
    paddingBottom: wp("3%"),
    paddingLeft: wp("3%"),
    flexGrow: 1,
  },
});
