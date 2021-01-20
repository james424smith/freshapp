import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SeafarerDocumentsFile } from "../../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { getSeafarerDocumentsFile } from "../../../redux/actions";
import ImageRender from "../../../components/ImgRender";
import * as RNFS from "react-native-fs";
import LoadingScreen from "../../../components/LoadingScreen";

import { IRootReducerType } from "../../../redux/reducers";
import PdfRender from "../../../components/PdfRender";
import { DocumentsStackParamList } from "../../../navigation/MoreScreenNavigation";
import { RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<DocumentsStackParamList, "SeafarerDocumentsFile">;
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  root: { flex: 1 },
  container: { alignSelf: "center", marginTop: 50 },
  centerIndicator: {
    flex: 1,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
const logoSize = 100;

const SeafarerDocumentsFileScreen = (props: Props) => {
  const [documentFromLocal, setDocumentFromLocal] = useState<
    SeafarerDocumentsFile | undefined
  >(undefined);
  const { route } = props;

  const seafarerDocumentsFile = useSelector<
    IRootReducerType,
    SeafarerDocumentsFile | undefined
  >(({ seafarerDocuments }) => seafarerDocuments.seafarerDocumentsFile);
  const isLoadingNew = useSelector<IRootReducerType, boolean>(
    ({ seafarerDocuments }) => seafarerDocuments.isLoadingNew
  );
  const dispatch = useDispatch();
  const openFileFromLocalStorage = (
    documentId: string | number,
    documentCounter: number,
    fileType: string
  ) => {
    return `${RNFS.DocumentDirectoryPath}/document/id-${documentId}-counter-${documentCounter}.${fileType}`;
  };

  useEffect(() => {
    const documentDetails = route.params?.documentDetails;
    //if document switched to offline
    if (documentDetails.isOffline) {
      const { documentId, documentCounter, fileType } = documentDetails;
      //open the offline document from the path
      RNFS.readFile(
        openFileFromLocalStorage(documentId, documentCounter, fileType)
      )
        .then((file: any) => {
          setDocumentFromLocal({ document: file, fileType });
        })
        .catch((error: any) => {
          console.log(error);
        });
      //If not offline, fetch the document from API
    } else {
      dispatch(getSeafarerDocumentsFile(documentDetails, false));
    }
  }, [dispatch, route.params]);

  const chooseComponentToShow = (file: SeafarerDocumentsFile) => {
    return file.fileType === "PDF" ? (
      <PdfRender document={file.document} resourceType={"base64"} />
    ) : (
      <ImageRender
        document={file.document}
        resourceType={"base64"}
        fileType={file.fileType}
      />
    );
  };

  const itemToShow = (
    isLoadingNewLocal: boolean,
    imgFile?: SeafarerDocumentsFile
  ) => {
    if (isLoadingNewLocal) {
      return (
        <View style={styles.root}>
          <LoadingScreen logoWidthSize={logoSize} logoHeightSize={logoSize} />
        </View>
      );
    } else {
      return imgFile ? chooseComponentToShow(imgFile) : undefined;
    }
  };

  //checking if the document is offline.
  const img = documentFromLocal ? documentFromLocal : seafarerDocumentsFile;
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {itemToShow(isLoadingNew, img)}
    </ScrollView>
  );
};

export default SeafarerDocumentsFileScreen;
