export interface NextOfKin {
  firstName?: string;
  familyName?: string;
  relationship?: string;
  telephone?: string;
  mobile?: string;
}

export interface BasicInfo {
  firstName: string;
  familyName: string;
  employeeId: number;
  dateOfBirth: string;
  placeOfBirth: string;
  maritalStatus: string;
  numberOfChildren?: number;
  height?: number;
  weight?: number;
  bmi?: number;
  nearestAirport: string;
  alternateAirport: string;
  address?: string[];
  mobile?: string[];
  telephone?: string[];
  status?: string;
}

export interface AvatarDetails {
  avatar?: string;
  initials: string;
}

export interface SeafarerDetails {
  basicInfo: BasicInfo;
  nextOfKin?: NextOfKin;
  photoSmall: AvatarDetails;
}
