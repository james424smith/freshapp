import { PayslipRecord, SeafarerDocuments, Document } from "../../interfaces";
import * as RNFS from "react-native-fs";
import AsyncStorage from "@react-native-community/async-storage";
import valueOrDefault from "../valueOrDefault";

type OfflineParams = {
  fileId: string | number;
  fileCounter?: number;
  fileType: string;
  categoryNumber?: string;
  document: string;
  documentDetails: Document | PayslipRecord;
};

const getDocumentsToBeCached = (
  parsedOfflineDocuments: SeafarerDocuments,
  documentDetails: Document,
  fileType: string,
  categoryNumber?: number | string
) => {
  if (categoryNumber === undefined) {
    return {
      ...parsedOfflineDocuments,
    };
  } else {
    const categoryDocuments = valueOrDefault(
      parsedOfflineDocuments[valueOrDefault(categoryNumber, 0).toString()],
      []
    ) as Document[];
    const documents = [...categoryDocuments, { ...documentDetails, fileType }];
    return {
      ...parsedOfflineDocuments,
      [categoryNumber]: documents,
    };
  }
};

const addDocumentToAsyncStorage = async (
  documentDetails: Document,
  fileType: string,
  categoryNumber?: number | string
) => {
  const offlineDocuments = valueOrDefault(
    await AsyncStorage.getItem("offlineDocuments"),
    "{}"
  ) as string;
  const parsedOfflineDocuments = JSON.parse(offlineDocuments);
  const documentsToBeCached = getDocumentsToBeCached(
    parsedOfflineDocuments,
    documentDetails,
    fileType,
    categoryNumber
  );

  await AsyncStorage.setItem(
    "offlineDocuments",
    JSON.stringify(documentsToBeCached)
  );

  return documentsToBeCached;
};

const addPayslipToAsyncStorage = async (
  documentDetails: PayslipRecord,
  fileType: string
) => {
  const offlinePayslips = valueOrDefault(
    await AsyncStorage.getItem("offlinePayslips"),
    "[]"
  ) as string;
  const payslips = JSON.parse(offlinePayslips);
  const documentsToBeCached = [...payslips, { ...documentDetails, fileType }];
  await AsyncStorage.setItem(
    "offlinePayslips",
    JSON.stringify(documentsToBeCached)
  );
};

const createFolderIfNotExist = async (type: string) => {
  const doesExist = await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${type}`);
  if (!doesExist) {
    await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${type}`);
  }
};

export const saveFileOffline = async (offlineParams: OfflineParams) => {
  try {
    const {
      fileId,
      fileCounter,
      fileType,
      categoryNumber,
      document,
      documentDetails,
    } = offlineParams;

    const type = fileCounter || fileCounter === 0 ? "document" : "payslip";

    const path =
      type === "document"
        ? `${RNFS.DocumentDirectoryPath}/document/id-${fileId}-counter-${fileCounter}.${fileType}`
        : `${RNFS.DocumentDirectoryPath}/payslip/id-${fileId}.${fileType}`;

    type === "document"
      ? await addDocumentToAsyncStorage(
          documentDetails as Document,
          fileType,
          categoryNumber
        )
      : await addPayslipToAsyncStorage(
          documentDetails as PayslipRecord,
          fileType
        );
    await createFolderIfNotExist(type);
    await RNFS.writeFile(path, document);
  } catch (e) {
    console.log("error while saving offline", e);
  }
};
