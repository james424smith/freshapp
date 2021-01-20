import { StyleProp } from "react-native";
import {
  NearbySeafarer,
  GetHistoryPayload,
  CargoDataTable,
  Document,
  NotificationDetails,
  AllotmentsRecord,
  PayslipRecord,
  Categories,
  ClotheData,
  SeafarerDocuments,
  Manager,
  Newsletters,
  PressReleases,
  Assignment,
  Flight,
} from "../interfaces";

type BasicInfo = {
  containerStyles: StyleProp<unknown>;
  labelStyles: StyleProp<unknown>;
  textValueStyles: StyleProp<unknown>;
  labelValue: string;
  textValue: string;
}[];

type AvailableValues =
  | string
  | number
  | NearbySeafarer
  | BasicInfo
  | CargoDataTable[]
  | undefined
  | Document[]
  | string[]
  | NotificationDetails[]
  | AllotmentsRecord[]
  | PayslipRecord[]
  | Categories[]
  | (number | undefined)[][]
  | ClotheData[]
  | GetHistoryPayload[]
  | Manager[]
  | PressReleases[]
  | Newsletters[]
  | Assignment[]
  | Flight[]
  | SeafarerDocuments
  | null;
type AvailableDefaultValues =
  | string
  | number
  | GetHistoryPayload
  | BasicInfo
  | CargoDataTable[]
  | Document[]
  | NotificationDetails[]
  | string[]
  | PayslipRecord[]
  | Categories[]
  | ClotheData[]
  | (number | undefined)[][]
  | AllotmentsRecord[]
  | GetHistoryPayload[]
  | Manager[]
  | PressReleases[]
  | Newsletters[]
  | Flight[]
  | SeafarerDocuments;
const valueOrDefault = (
  value: AvailableValues,
  defaultValue: AvailableDefaultValues
) => {
  if (value) {
    return value;
  }
  return defaultValue;
};

export default valueOrDefault;
