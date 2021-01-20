import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import { READ_MORE_PAYSLIP } from "../../constants/routes";
import { PayslipRecord, Document } from "../../interfaces";
import styles from "../../styles/more_screens/SalaryAllotmentsStyles";
import Toggle from "../Toggle";
import { useSelector, useDispatch } from "react-redux";
import { IRootReducerType } from "../../redux/reducers";
import Attached from "../../../assets/icons/more_screen/seafarerDocumentsScreen/attach-icon.svg";
import {
  getPayslipDocumentsFile,
  removePayslipDocumentsFileFromLocal,
} from "../../redux/actions";
import { useTheme } from "@react-navigation/native";
import ShareButton from "../../../assets/icons/more_screen/share.svg";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import valueOrDefault from "../../common/valueOrDefault";
import * as ShareFileHelper from "../../common/offline_utilities/ShareFiles";

interface Props {
  payslipDocument: PayslipRecord;
  navigate: (arg1: string, arg2: unknown) => void;
}

const PayslipDetailsComponent = (props: Props) => {
  const dispatch = useDispatch();
  const isDownloading = useSelector<IRootReducerType, boolean>(
    ({ payslipDetails }) => payslipDetails.isDownloading
  );
  const downloadingPayslipId = useSelector<IRootReducerType, number>(
    ({ payslipDetails }) =>
      valueOrDefault(payslipDetails.downloadingPayslipId, 0) as number
  );
  const { payslipDocument, navigate } = props;
  const theme = useTheme();
  const shareIconSize = wp("4%");
  const handleClick = async (
    payslipDocumentLocal: PayslipRecord | Document,
    shouldDownload: boolean
  ) => {
    shouldDownload
      ? dispatch(
          getPayslipDocumentsFile(payslipDocumentLocal as PayslipRecord, true)
        )
      : dispatch(
          removePayslipDocumentsFileFromLocal(
            payslipDocumentLocal as PayslipRecord
          )
        );
  };

  const { vesselName, rank, dateMonth } = payslipDocument;
  return (
    <View style={styles.opacityOuterView}>
      <View style={styles.opacityStyle}>
        <TouchableOpacity
          testID={"read-more-payslip-button"}
          onPress={() => {
            navigate(READ_MORE_PAYSLIP, {
              payslipDocument,
            });
          }}
        >
          <View style={styles.root}>
            <View
              style={[
                payslipDocument.isOffline
                  ? {
                      ...styles.isOfflineContainerColor,
                      backgroundColor: theme.colors.isOfflineSalaryColor,
                    }
                  : {
                      ...styles.isOnlineContainerColor,
                      backgroundColor: theme.colors.WhiteBackgroundToDarkBlue,
                    },
              ]}
            >
              <View style={styles.payslipContainer}>
                <View style={styles.makeRow}>
                  <Attached style={styles.svgSize} />
                  <Text
                    style={{
                      ...styles.textDescription,
                      color: theme.colors.text,
                    }}
                  >
                    {dateMonth}
                  </Text>
                  <Toggle
                    type="Payslip"
                    documentId={payslipDocument.payslipId}
                    isDownloading={isDownloading}
                    documentsFile={payslipDocument}
                    downloadingDocId={downloadingPayslipId}
                    popUpTitle={"Warning"}
                    handleOnPress={handleClick}
                  />
                </View>
                <View style={styles.bottomViewContainer}>
                  <View style={styles.labelsContainer}>
                    <Text
                      style={{
                        ...styles.labelsValue,
                        color: theme.colors.text,
                      }}
                    >
                      {"Vessel:"}
                    </Text>
                    <Text
                      style={{
                        ...styles.labelsValue,
                        color: theme.colors.text,
                      }}
                    >
                      {"Rank:"}
                    </Text>
                  </View>
                  <View style={styles.otherDataContainer}>
                    <Text
                      style={{
                        ...styles.detailsValueBold,
                        color: theme.colors.text,
                      }}
                    >
                      {vesselName}
                    </Text>
                    <Text
                      style={{
                        ...styles.detailsValueBold,
                        color: theme.colors.text,
                      }}
                    >
                      {rank}
                    </Text>
                    <View style={styles.shareButtonContainer}>
                      <TouchableOpacity
                        testID={"share-payslip-button"}
                        onPress={async () => {
                          await ShareFileHelper.sharePDF(
                            payslipDocument.payslipId,
                            undefined,
                            payslipDocument.vesselCode
                          );
                        }}
                      >
                        <ShareButton
                          width={shareIconSize}
                          fill={theme.colors.blackAndWhite}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayslipDetailsComponent;
