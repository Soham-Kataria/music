export interface ITunesSong {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string;
  artworkUrl100: string;
  collectionName?: string;
  primaryGenreName?: string;
  releaseDate?: string;
}

export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesSong[];
}
