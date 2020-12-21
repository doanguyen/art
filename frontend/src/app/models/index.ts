export enum DisplayMode{
  Card,
  List,
}
export interface Artwork {
  Title: string;
  ThumbnailURL: string;
  CreditLine: string;
}

export interface ArtworksResponse {
  count: number;
  results: Artwork[];
}
