export interface MailingAddress {
  poBox: string;
  country: string;
  city: string;
  postCode: string;
}

export interface PhysicalAddress {
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
}

export interface Manager {
  label: string;
  value: string;
  order: number;
}

export interface ImprintContact {
  website: string;
  phone: string;
  managers: Manager[];
  fax: string;
  email: string;
  vatNumber: string;
  contactEmail: string;
}

export interface Imprint {
  mailingAddress: MailingAddress;
  physicalAddress: PhysicalAddress;
  contact: ImprintContact;
}
