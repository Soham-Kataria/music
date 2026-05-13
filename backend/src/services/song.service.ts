import axios from 'axios';
import { SongDTO } from '../types/index.js';
import { ITunesSearchResponse, ITunesSong } from '../types/itunes.js';

export class SongService {
  private static readonly ITUNES_SEARCH_URL = 'https://itunes.apple.com/search';
  private static readonly ITUNES_LOOKUP_URL = 'https://itunes.apple.com/lookup';

  static async searchSongs(query: string): Promise<SongDTO[]> {
    const response = await axios.get<ITunesSearchResponse>(this.ITUNES_SEARCH_URL, {
      params: {
        term: query,
        media: 'music',
        limit: 25,
      },
    });

    return response.data.results.map(this.mapITunesToDTO);
  }

  static async getSongById(id: string): Promise<SongDTO | null> {
    const response = await axios.get<ITunesSearchResponse>(this.ITUNES_LOOKUP_URL, {
      params: { id },
    });

    if (!response.data.results || response.data.results.length === 0) {
      return null;
    }

    return this.mapITunesToDTO(response.data.results[0]);
  }

  private static mapITunesToDTO(item: ITunesSong): SongDTO {
    return {
      id: item.trackId.toString(),
      title: item.trackName,
      artist: item.artistName,
      preview: item.previewUrl,
      artwork: item.artworkUrl100,
      album: item.collectionName || null,
      genre: item.primaryGenreName || null,
      releaseDate: item.releaseDate || null,
    };
  }
}
