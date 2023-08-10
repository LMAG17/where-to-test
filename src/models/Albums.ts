type AlbumResponse = {
  "subsonic-response": AlbumSubSonicResponse;
};

type AlbumSubSonicResponse = {
  status: string;
  version: string;
  albumList2?: {
    album: Album[];
  };
  album?: Album;
};

type Album = {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt: string;
  songCount: number;
  duration: number;
  playCount: number;
  created: string;
  year: number;
  genre: string;
  starred?: undefined;
  image?: string;
};
