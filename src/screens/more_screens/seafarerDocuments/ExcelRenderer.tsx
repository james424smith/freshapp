import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import { Document, SeafarerDocumentsFile } from "../../../interfaces";
import OpenFile from "@quinaryio/react-native-doc-viewer";
import LoadingScreen from "../../../components/LoadingScreen";
import styles from "../../../styles/more_screens/SalaryPdfStyles";
import { getSeafarerDocumentsFile } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { IRootReducerType } from "../../../redux/reducers";

import { IOS } from "../../../constants/Platforms";
import Text from "../../../components/StyledText";
import { RouteProp } from "@react-navigation/native";
import { DocumentsStackParamList } from "../../../navigation/MoreScreenNavigation";
const logoSize = 100;

interface Props {
  route: RouteProp<DocumentsStackParamList, "SeafarerDocumentsExcelFile">;
}

const ExcelRendererComponent = (props: Props) => {
  const { route } = props;
  const seafarerDocumentsFile = useSelector<
    IRootReducerType,
    SeafarerDocumentsFile | undefined
  >(({ seafarerDocuments }) => seafarerDocuments.seafarerDocumentsFile);
  const isLoadingNew = useSelector<IRootReducerType, boolean>(
    ({ seafarerDocuments }) => seafarerDocuments.isLoadingNew
  );
  const dispatch = useDispatch();
  const [docDetails, setDocumentDetails] = useState<Document | undefined>(
    undefined
  );
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const documentDetails = route.params?.documentDetails;
    setDocumentDetails(documentDetails);
    dispatch(getSeafarerDocumentsFile(documentDetails, false));
  }, [route.params, dispatch]);

  useEffect(() => {
    const handleError = (errorLocal: any) => {
      if (errorLocal) {
        setAnimating(false);
        setError("error");
      } else {
        setAnimating(false);
      }
    };

    setAnimating(true);
    if (seafarerDocumentsFile && docDetails && !isLoadingNew) {
      if (Platform.OS === IOS) {
        OpenFile.openDocb64(
          [
            {
              base64: seafarerDocumentsFile.document,
              fileName: `doc-${docDetails.documentId}-counter-${
                docDetails.documentCounter
              }.${seafarerDocumentsFile.fileType.toLowerCase()}`,
              fileType: seafarerDocumentsFile.fileType.toLowerCase(),
            },
          ],
          (errorLocal: any, _url: any) => {
            handleError(errorLocal);
          }
        );
      } else {
        OpenFile.openDocb64(
          [
            {
              base64: seafarerDocumentsFile.document,
              fileName: `doc-${docDetails.documentId}-counter-${
                docDetails.documentCounter
              }.${seafarerDocumentsFile.fileType.toLowerCase()}`,
              fileType: seafarerDocumentsFile.fileType.toLowerCase(),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              cache: false,
            },
          ],
          (errorLocal: any, _url: any) => {
            handleError(errorLocal);
          }
        );
      }
    }
  }, [seafarerDocumentsFile, docDetails, isLoadingNew]);

  if (error) {
    return (
      <View style={styles.root}>
        <Text>
          Your phone cannot open {seafarerDocumentsFile?.fileType} files. Please
          download an app that is capable of opening such files and try again.
        </Text>
      </View>
    );
  } else if (animating || isLoadingNew) {
    return (
      <View style={styles.root}>
        <LoadingScreen logoWidthSize={logoSize} logoHeightSize={logoSize} />
      </View>
    );
  } else {
    return (
      <View style={styles.root}>
        <Text>
          {docDetails?.description} is open in an external{" "}
          {docDetails?.documentExtension?.toLowerCase()} app.
        </Text>
      </View>
    );
  }
};

export default ExcelRendererComponent;
