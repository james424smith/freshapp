export interface Document {
  documentId: number;
  documentCounter: number;
  docLicNumber?: string;
  nation?: string;
  description?: string;
  expiryDate?: string;
  issueDate?: string;
  docFileSize?: string;
  isDeactivated?: boolean;
  categoryNumber: string;
  fileType?: string;
  isExpired: boolean;
  isOffline?: boolean;
  documentExtension?: string;
  marked?: boolean;
  hasAttachment?: boolean;
}

export interface SeafarerDocumentsFile {
  document: string;
  fileType: string;
}

export interface SeafarerDocuments {
  [key: string]: Document[];
}

export interface Categories {
  id: string;
  label: string;
  orderNo: string;
}

export interface SeafarerDocumentsAndCategories {
  categories: Categories[];
  documents: SeafarerDocuments;
}
