export interface CmPhoto {
  avatar?: string;
  initials: string;
}
export interface ContactInfo {
  superintendentId?: string;
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
  timezone?: string;
}
export interface CrewManager {
  crewingManager: ContactInfo;
  photoSmall?: CmPhoto;
}
