export enum DisplayMode {
  Card,
  List,
}

export interface Artist {
  DisplayName: string;
  ArtistBio: string;
  Nationality: string;
  Gender: string;
  BeginDate: number;
  EndDate: number;
}

export interface Artwork {
  id: number;
  Title: string;
  ThumbnailURL: string;
  CreditLine: string;
  Date: string;
  Medium: string;
  Dimensions: string;
  Classification: string;
  Department: string;
  DateAcquired: string;
  URL: string;
  ConstituentID: Artist[];
}

export interface ArtworksResponse {
  count: number;
  results: Artwork[];
}
