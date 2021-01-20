import React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Document, PayslipRecord } from "../interfaces";
import ToggleSwitch from "toggle-switch-react-native";
import colors from "../constants/styles/colors";
import styles from "../styles/more_screens/SeafarerDocumentationStyles";
import Alert from "./AlertPopUpMessageComponent";
import Downloaded from "../../assets/icons/download.svg";
const smallIconSize = 23;
import { useTheme } from "@react-navigation/native";

interface Props {
  documentsFile: Document | PayslipRecord;
  documentId: number | string;
  type: string;
  handleOnPress: (
    documentDetailsLocal: Document | PayslipRecord,
    shouldDownload: boolean
  ) => Promise<void>;
  popUpTitle: string;
  isDownloading: boolean;
  downloadingDocId?: number;
  downloadingDocCounter?: number;
  documentCounter?: number;
}

export default (props: Props) => {
  const {
    documentsFile,
    handleOnPress,
    popUpTitle,
    isDownloading,
    downloadingDocId,
    documentId,
    documentCounter,
    downloadingDocCounter,
    type,
  } = props;

  const fileSize = documentsFile.docFileSize ?? "";

  const popUpMessage = `Additional charges may apply from your Network Provider ${fileSize}`;
  const theme = useTheme();

  function handleAlertClick() {
    handleOnPress(documentsFile as Document, true);
  }

  function handleOnToggle() {
    if (documentsFile.isOffline) {
      handleOnPress(documentsFile as Document, false);
    } else {
      Alert({
        title: popUpTitle,
        handleClick: handleAlertClick,
        message: popUpMessage,
      });
    }
  }

  function chooseIconToShow() {
    if (
      isDownloading &&
      documentId === downloadingDocId &&
      (type === "Payslip" ||
        (type === "Document" && documentCounter === downloadingDocCounter))
    ) {
      return (
        <ActivityIndicator
          size="small"
          color={theme.colors.activityIndicatorBlue}
        />
      );
    }
    if (documentsFile.isOffline && isDownloading) {
      return <Downloaded width={smallIconSize} height={smallIconSize} />;
    } else {
      return undefined;
    }
  }

  const shouldDownload = !isDownloading ? handleOnToggle : () => {};

  return (
    <TouchableOpacity
      testID={"toggle-button"}
      style={styles.toggleContainer}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      onPress={shouldDownload}
    >
      <ToggleSwitch
        disabled={isDownloading}
        onToggle={shouldDownload}
        isOn={documentsFile.isOffline}
        onColor={colors.marlowBlue}
        offColor={colors.inactiveGrey}
        size="small"
      />
      <View style={isDownloading && styles.svgContainer}>
        {chooseIconToShow()}
      </View>
    </TouchableOpacity>
  );
};
