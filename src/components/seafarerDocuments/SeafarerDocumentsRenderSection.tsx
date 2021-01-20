import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import { Document, PayslipRecord } from "../../interfaces";
import styles from "../../styles/more_screens/SeafarerDocumentationStyles";
import Toggle from "../Toggle";
import {
  getSeafarerDocumentsFile,
  removeDocumentFromLocal,
} from "../../redux/actions";
import { IRootReducerType } from "../../redux/reducers";
import AboutToExpire from "../../../assets/icons/more_screen/seafarerDocumentsScreen/about-to-expire.svg";
import Attached from "../../../assets/icons/more_screen/seafarerDocumentsScreen/attach-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import * as ShareFileHelper from "../../common/offline_utilities/ShareFiles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShareButton from "../../../assets/icons/more_screen/share.svg";
import Colors from "../../constants/styles/colors";
type Props = {
  navigate: (arg1: string, arg2: unknown) => void;
  documentDetails: Document;
};

const handleOnPress = (
  documentDetailsLocal: Document,
  navigate: (arg: string, arg2: { documentDetails: Document }) => void
) => {
  if (
    documentDetailsLocal.documentExtension?.toLowerCase() === "xls" ||
    documentDetailsLocal.documentExtension?.toLowerCase() === "xlsx"
  ) {
    navigate("SeafarerDocumentsExcelFile", {
      documentDetails: documentDetailsLocal,
    });
  } else {
    navigate("SeafarerDocumentsFile", {
      documentDetails: documentDetailsLocal,
    });
  }
};

const Warning = ({
  isExpired,
  isMarked,
}: {
  isExpired: boolean;
  isMarked: boolean;
}) => {
  if (isExpired || isMarked) {
    return <AboutToExpire style={styles.svgSize} fill="#FF0000" />;
  } else {
    return null;
  }
};

const AttachmentIcon = ({ documentDetails }: { documentDetails: Document }) => {
  const theme = useTheme();
  if (documentDetails.hasAttachment && documentDetails.isDeactivated) {
    return (
      <Attached style={styles.svgSize} fill={theme.colors.blackAndWhite} />
    );
  }
  return <Attached style={styles.svgSize} fill={Colors.black} />;
};

const SeafarerDocumentsRenderSection = (props: Props) => {
  const isDownloading = useSelector<IRootReducerType, boolean>(
    ({ seafarerDocuments }) => seafarerDocuments.isDownloading
  );
  const downloadingDocId = useSelector<IRootReducerType, number>(
    ({ seafarerDocuments }) => seafarerDocuments.downloadingDocId
  );
  const downloadingDocCounter = useSelector<IRootReducerType, number>(
    ({ seafarerDocuments }) => seafarerDocuments.downloadingDocCounter
  );
  const dispatch = useDispatch();
  const { navigate, documentDetails } = props;
  const shareIconSize = wp("4%");
  const handleClick = async (
    documentDetailsLocal: Document | PayslipRecord,
    shouldDownload: boolean
  ) => {
    shouldDownload
      ? dispatch(
          getSeafarerDocumentsFile(documentDetailsLocal as Document, true)
        )
      : dispatch(removeDocumentFromLocal(documentDetailsLocal as Document));
  };

  const shouldRenderToggle = (documentDetailsLocal: Document) => {
    return (
      documentDetailsLocal.hasAttachment &&
      documentDetailsLocal.documentExtension?.toLowerCase() !== "xls" &&
      documentDetailsLocal.documentExtension?.toLowerCase() !== "xlsx" && (
        <Toggle
          type="Document"
          documentId={documentDetailsLocal.documentId}
          documentCounter={documentDetailsLocal.documentCounter}
          popUpTitle={"Download Document"}
          documentsFile={documentDetails}
          handleOnPress={handleClick}
          isDownloading={isDownloading}
          downloadingDocId={downloadingDocId}
          downloadingDocCounter={downloadingDocCounter}
        />
      )
    );
  };

  const theme = useTheme();

  const isExpiredOrDeactivated =
    (documentDetails.isExpired && documentDetails.marked) ||
    documentDetails.isDeactivated;

  return (
    <View style={styles.root}>
      <View style={styles.outerView}>
        <View
          style={
            documentDetails.isDeactivated
              ? {
                  ...styles.isDeactivatedElevation,
                  backgroundColor: theme.colors.primary,
                }
              : { ...styles.elevation, backgroundColor: theme.colors.primary }
          }
        >
          <View
            style={
              documentDetails.isOffline
                ? styles.isOfflineContainerColor
                : {
                    ...styles.isOnlineContainerColor,
                    backgroundColor: theme.colors.primary,
                  }
            }
          >
            <View
              style={
                documentDetails.isDeactivated
                  ? styles.isDeactivatedContainerColor
                  : {
                      ...styles.isOnlineContainerColor,
                      backgroundColor: theme.colors.primary,
                    }
              }
            >
              <View style={styles.documentContainer}>
                <TouchableOpacity
                  testID={"document-navigate-button"}
                  disabled={!documentDetails.hasAttachment}
                  onPress={() => {
                    handleOnPress(documentDetails, navigate);
                  }}
                >
                  <View style={styles.makeRow}>
                    <View style={styles.markedContainer}>
                      <AttachmentIcon documentDetails={documentDetails} />
                    </View>
                    <View style={styles.firstRowContainer}>
                      <Text
                        style={
                          documentDetails.isDeactivated
                            ? styles.isDeactivatedTextDescription
                            : {
                                ...styles.textDescription,
                                color:
                                  theme.colors.inactiveTouchableOpacityStyle,
                              }
                        }
                      >
                        {documentDetails.description}
                      </Text>
                    </View>
                    <View style={styles.shouldRenderToggleContainer}>
                      {shouldRenderToggle(documentDetails)}
                    </View>
                  </View>
                  <View style={styles.makeRow}>
                    <View style={styles.markedContainer} />
                    <View style={styles.documentDetailsContainer}>
                      <Text
                        style={
                          documentDetails.isDeactivated
                            ? styles.textDocLicNumber
                            : {
                                ...styles.textDocLicNumber,
                                color:
                                  theme.colors.inactiveTouchableOpacityStyle,
                              }
                        }
                      >
                        {documentDetails.docLicNumber}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.makeRow}>
                    <View style={styles.markedContainer} />
                    <View style={styles.documentDetailsContainer}>
                      <Text
                        style={
                          documentDetails.isDeactivated
                            ? styles.isDeactivatedTextNation
                            : {
                                ...styles.textNation,
                                color:
                                  theme.colors.inactiveTouchableOpacityStyle,
                              }
                        }
                      >
                        {documentDetails.nation}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.makeRow}>
                    <View style={styles.markedContainer}>
                      <Warning
                        isExpired={documentDetails.isExpired}
                        isMarked={documentDetails.isExpired}
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          isExpiredOrDeactivated
                            ? styles.dateText
                            : {
                                ...styles.dateTextActive,
                                color: theme.colors.darkNavyToWhite,
                              },
                        ]}
                      >
                        Exp.: {documentDetails.expiryDate}
                      </Text>
                    </View>
                    <View style={styles.issuedDateContainer}>
                      <Text
                        style={
                          isExpiredOrDeactivated
                            ? styles.dateTextIssued
                            : {
                                ...styles.dateTextActiveIssued,
                                color: theme.colors.blackAndWhite,
                              }
                        }
                      >
                        Issued: {documentDetails.issueDate}
                      </Text>
                    </View>
                    <View style={styles.shareButtonContainer}>
                      <View style={styles.shareButtonStyle}>
                        <TouchableOpacity
                          style={styles.shareButtonStyle}
                          testID={"share-document-button"}
                          onPress={async () => {
                            await ShareFileHelper.sharePDF(
                              documentDetails.documentId,
                              documentDetails.documentCounter
                            );
                          }}
                        >
                          <ShareButton
                            fill={
                              isExpiredOrDeactivated
                                ? Colors.black
                                : theme.colors.blackAndWhite
                            }
                            width={shareIconSize}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SeafarerDocumentsRenderSection;
