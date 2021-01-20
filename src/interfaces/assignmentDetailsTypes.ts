export interface Flight {
  globalDistributionSystem?: string;
  agentId?: number;
  ticketDeposited?: string;
  flightNumber?: string;
  arrivalDate?: string;
  flightInfoId?: number;
  toAirport?: string;
  vesselCode?: number;
  passengerRegistrationNumber?: string;
  vesselImoNumber?: number;
  departureDate?: string;
  departureTime?: string;
  arrivalTime?: string;
  prepaidTicketInAdvance?: string;
  airline?: string;
  prepaidTicketInAdvanceType?: string;
  fromAirport?: string;
  fromAirportCity?: string;
  toAirportCity?: string;
}

export interface FlightData {
  flights: Flight[];
}

export interface AssignmentBasicDetails {
  alternateAirport?: string;
  inductionChecklist?: boolean;
  workingClothesRemarks?: string;
  availabilityDate?: string;
  endOfContractDate?: string;
  employeeId?: number;
  joiningDate?: string;
  assignmentId?: number;
  workingClothes?: boolean;
  proposalId?: number;
  nearestAirport?: string;
  isProposalApproved?: boolean;
  vesselCode?: number;
  contractCode?: string;
  port?: string;
  vesselImoNumber?: number;
  laidUpAgreement?: boolean;
  proposedBy?: string;
  vesselFlag?: string;
  assignmentDate?: string;
  portAgentId?: number;
  vesselName?: string;
}

export interface EmploymentOffer {
  document: string;
}

export interface PortAgent {
  agentId?: string;
  emailAddress?: string[];
  website?: string[];
  address?: string;
  googleMapLink?: string;
  aohTelephoneNumbers?: string[];
  directTelephoneNumbers?: string[];
  latitude?: string;
  name?: string;
  skypeAddress?: string;
  longitude?: string;
}

export interface CargoItemData {
  label: string;
  key: string;
  value: string;
}

export type CargoDataTable = CargoItemData[];

export interface VesselDetails {
  deadWeightTonnage?: number;
  beam?: number;
  flag?: string;
  longitude?: number;
  mainEngineOutput?: number;
  managingAgent?: string;
  vesselSubType?: string;
  grossTonnage?: number;
  vesselType?: string;
  vesselCode?: number;
  lengthOverall?: number;
  draught?: number;
  vesselImoNumber?: number;
  vesselImage?: string;
  mainEngineSeries?: string;
  name?: string;
  mainEngineMaker?: string;
  cargoInstallation?: CargoDataTable[];
  ecdisModel?: string;
  latitude?: number;
  lengthBetweenPerpendiculars?: number;
  ecdisManufacture?: string;
}

export interface Assignment {
  assignmentBasicDetails?: AssignmentBasicDetails;
  employmentOfferDocument?: EmploymentOffer;
  flightData?: FlightData;
  vesselDetails?: VesselDetails;
}
