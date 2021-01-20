import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import PdfRender from "../../components/PdfRender";
import { useSelector, useDispatch } from "react-redux";
import { getCovidDocument } from "../../redux/actions";
import { IRootReducerType } from "../../redux/reducers";
import LoadingScreen from "../../components/LoadingScreen";

const logoSize = 100;

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

const CovidDocumentScreen = () => {
  const covidDocumentFile = useSelector<IRootReducerType, string>(
    ({ covidDocument }) => covidDocument.covidDocument
  );

  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ covidDocument }) => covidDocument.loader
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCovidDocument());
  }, [dispatch]);

  const pdf = covidDocumentFile;

  if (isLoading) {
    return (
      <View style={styles.root}>
        <LoadingScreen logoWidthSize={logoSize} logoHeightSize={logoSize} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {pdf ? <PdfRender document={pdf} resourceType={"base64"} /> : <View />}
    </ScrollView>
  );
};

export default CovidDocumentScreen;
