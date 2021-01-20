export interface SeaServiceRecord {
  signOnPort?: string;
  signOffPort?: string;
  vesselIMONumber?: number;
  rank?: string;
  signOnDate?: string;
  signOffDate?: string;
  vesselName?: string;
}

export interface SeaService {
  marlowSeaServices?: SeaServiceRecord[];
  nonMarlowSeaServices?: SeaServiceRecord[];
}
