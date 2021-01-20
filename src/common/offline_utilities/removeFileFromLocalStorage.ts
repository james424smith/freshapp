import * as RNFS from "react-native-fs";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import { PayslipRecord, SeafarerDocuments, Document } from "../../interfaces";
import valueOrDefault from "../valueOrDefault";

type RemoveFileFromLocalStorageParams = {
  fileId: string | number;
  fileType?: string;
  fileCounter?: number;
  categoryNumber?: string;
};

const getDocumentsToBeCached = (
  parsedOfflineDocuments: SeafarerDocuments,
  fileId: string | number,
  categoryNumber?: string,
  fileCounter?: number
) => {
  if (categoryNumber === undefined) {
    return {
      ...parsedOfflineDocuments,
    };
  } else {
    const categoryDocuments = valueOrDefault(
      parsedOfflineDocuments[categoryNumber.toString()],
      []
    ) as Document[];
    const documents = _.filter(
      categoryDocuments,
      (doc) => doc.documentId !== fileId || doc.documentCounter !== fileCounter
    );
    return {
      ...parsedOfflineDocuments,
      [categoryNumber]: documents,
    };
  }
};

const removeDocument = async (
  parsedOfflineDocuments: SeafarerDocuments,
  fileId: string | number,
  categoryNumber?: string,
  fileCounter?: number
) => {
  const documentsToBeCached = getDocumentsToBeCached(
    parsedOfflineDocuments,
    fileId,
    categoryNumber,
    fileCounter
  );

  await AsyncStorage.setItem(
    "offlineDocuments",
    JSON.stringify(documentsToBeCached)
  );
};

const removePayslip = async (
  parsedOfflineDocuments: PayslipRecord[],
  fileId: string | number
) => {
  const payslips = _.filter(
    parsedOfflineDocuments,
    (payslip) => payslip.payslipId !== fileId
  );
  await AsyncStorage.setItem("offlinePayslips", JSON.stringify(payslips));
};

export const removeFileFromLocalStorage = async (
  params: RemoveFileFromLocalStorageParams
) => {
  const { fileId, fileCounter, fileType, categoryNumber } = params;
  const type = fileCounter || fileCounter === 0 ? "document" : "payslip";
  const path =
    type === "document"
      ? `${RNFS.DocumentDirectoryPath}/document/id-${fileId}-counter-${fileCounter}.${fileType}`
      : `${RNFS.DocumentDirectoryPath}/payslip/id-${fileId}.${fileType}`;
  const offlineDocuments =
    type === "document"
      ? (valueOrDefault(
          await AsyncStorage.getItem("offlineDocuments"),
          "{}"
        ) as string)
      : (valueOrDefault(
          await AsyncStorage.getItem("offlinePayslips"),
          "[]"
        ) as string);
  const parsedOfflineDocuments = JSON.parse(offlineDocuments);

  type === "document"
    ? await removeDocument(
        parsedOfflineDocuments,
        fileId,
        categoryNumber,
        fileCounter
      )
    : await removePayslip(parsedOfflineDocuments, fileId);

  await RNFS.unlink(path);
};
