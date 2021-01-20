export interface ClotheData {
  clothingId?: number;
  item?: string;
  quantity?: number;
  vesselName?: string;
  issuingAgentName?: string;
  issueDate?: string;
}
export interface WorkingClothes {
  shoeSizeUk?: number;
  shoeSizeEu?: number;
  shoeSizePhl?: number;
  shoeSizeUs?: number;
  workingClothes?: ClotheData[];
}
