import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { PayslipDocumentsFile } from "../../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { getPayslipDocumentsFile } from "../../../redux/actions";
import PdfRender from "../../../components/PdfRender";
import styles from "../../../styles/more_screens/SalaryPdfStyles";
import RNFS from "react-native-fs";
import LoadingScreen from "../../../components/LoadingScreen";

import { IRootReducerType } from "../../../redux/reducers";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SalaryStackParamList } from "../../../navigation/MoreScreenNavigation";

const logoSize = 100;

interface Props {
  route: RouteProp<SalaryStackParamList, "ReadMorePayslip">;
}

const ReadMorePayslipScreen = (props: Props) => {
  const [documentFromLocal, setDocumentFromLocal] = useState<
    PayslipDocumentsFile | undefined
  >(undefined);
  const { route } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const payslipDocumentsFile = useSelector<
    IRootReducerType,
    PayslipDocumentsFile | undefined
  >(({ payslipDetails }) => payslipDetails.payslipDocumentsFile);
  const isLoadingNew = useSelector<IRootReducerType, boolean>(
    ({ payslipDetails }) => payslipDetails.isLoadingNew
  );

  const openFileFromLocalStorage = (documentId: string, fileType: string) => {
    return `${RNFS.DocumentDirectoryPath}/payslip/id-${documentId}.${fileType}`;
  };

  useEffect(() => {
    const documentDetails = route.params?.payslipDocument;
    if (documentDetails.isOffline) {
      const { payslipId, fileType } = documentDetails;
      //open the offline document from the path
      RNFS.readFile(openFileFromLocalStorage(payslipId, fileType)).then(
        (file: any) => {
          setDocumentFromLocal(file as PayslipDocumentsFile);
        }
      );
    } else {
      //If not offline, fetch the document from API
      dispatch(getPayslipDocumentsFile(documentDetails, false));
    }
  }, [dispatch, navigation, route.params]);

  const itemToShow = (
    isLoadingNewLocal: boolean,
    pdfFile?: string | PayslipDocumentsFile
  ) => {
    if (isLoadingNewLocal) {
      return (
        <View style={styles.root}>
          <LoadingScreen logoWidthSize={logoSize} logoHeightSize={logoSize} />
        </View>
      );
    } else {
      return (
        pdfFile && (
          <PdfRender document={pdfFile as string} resourceType={"base64"} />
        )
      );
    }
  };

  const payslip = payslipDocumentsFile && payslipDocumentsFile?.payslip;

  const pdf = documentFromLocal ? documentFromLocal : payslip;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {itemToShow(isLoadingNew, pdf)}
    </ScrollView>
  );
};

export default ReadMorePayslipScreen;
