export interface Artwork {
  Title: string;
  ThumbnailURL: string;
}

export interface ArtworksResponse {
  count: number;
  results: Artwork[];
}
