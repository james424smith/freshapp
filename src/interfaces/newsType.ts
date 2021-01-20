export interface Newsletters {
  document: string;
  title: string;
  summary?: string;
}

export interface NewNewsletter {
  imageUrl: string;
  text: string;
  newItemType: string;
  document: string;
}

export interface PressReleases {
  title: string;
  summary?: string;
  text?: string;
  imageUrl: string;
}

export interface News {
  pressReleases?: PressReleases[];
  newsletters?: Newsletters[];
}
