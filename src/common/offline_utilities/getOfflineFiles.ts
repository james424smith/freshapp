import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import {
  Categories,
  SeafarerDocuments,
  Document,
  PayslipRecord,
} from "../../interfaces";
import valueOrDefault from "../valueOrDefault";

type ReadOfflineDocumentsParams = {
  categories: Categories[];
  documents: SeafarerDocuments;
  offlineDocuments: string;
  type?: string;
};

export const getDocumentsPerCategory = (
  params: ReadOfflineDocumentsParams
): SeafarerDocuments => {
  const { categories, documents, offlineDocuments } = params;
  return categories.reduce((acc: SeafarerDocuments, category: Categories) => {
    const apiDocuments = documents[category.id.toString()];
    const offlineDocumentsFile =
      JSON.parse(valueOrDefault(offlineDocuments, "{}") as string)[
        category.id.toString()
      ] ?? [];

    const apiDocuments2 = _.differenceWith(
      apiDocuments,
      offlineDocumentsFile,
      (api: Document, offline: Document) =>
        api.documentId === offline.documentId &&
        api.documentCounter === offline.documentCounter
    ).map((a) => ({
      ...a,
      isOffline: false,
    }));

    const offlineDocumentsFile2 = offlineDocumentsFile.map((a: Document) => ({
      ...a,
      isOffline: true,
    }));

    return {
      ...acc,
      [category.id.toString()]: [...offlineDocumentsFile2, ...apiDocuments2],
    };
  }, {});
};

export const getPayslips = async (params: {
  documents: PayslipRecord[];
}): Promise<PayslipRecord[]> => {
  const { documents } = params;
  const offlinePayslips = valueOrDefault(
    await AsyncStorage.getItem("offlinePayslips"),
    "[]"
  ) as string;
  const offlinePayslipsParsed = JSON.parse(offlinePayslips);

  const apiPayslips = _.differenceWith(
    documents,
    offlinePayslipsParsed,
    (api: PayslipRecord, offline: PayslipRecord) => {
      return api.payslipId === offline.payslipId;
    }
  ).map((p) => ({
    ...p,
    isOffline: false,
  }));

  const offlinePayslips2 = offlinePayslipsParsed.map((a: Document) => ({
    ...a,
    isOffline: true,
  }));

  return [...offlinePayslips2, ...apiPayslips];
};
