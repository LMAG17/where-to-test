import { useEffect, useState } from "react";
import { getAlbumsService } from "../services/album";
import { getEndpointURL } from "../Utils/serverUrl";
import { ALBUM_COVER_ENDPOINT, ID_QUERY } from "../constanst/server";

export const useAlmbus = () => {
  const [albums, setAlmbus] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (albums.length < 1) {
      getAlbums();
    }
  }, []);

  const getAlbums = () => {
    setLoading(true);
    getAlbumsService("newest")
      .then((data) => {
        const newAlbumData = data.map((album) => {
          const image = `${getEndpointURL(ALBUM_COVER_ENDPOINT)}&${ID_QUERY}${
            album.coverArt
          }`;
          return { ...album, image };
        });
        setAlmbus(newAlbumData);
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  };
  return {
    albums,
    error,
    loading,
  };
};
