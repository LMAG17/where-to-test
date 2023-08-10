import { useEffect, useState } from "react";
import { getAlbumService, getAlbumsService } from "../services/album";
import { getEndpointURL } from "../Utils/serverUrl";
import { ALBUM_COVER_ENDPOINT, ID_QUERY } from "../constanst/server";

export const useAlmbu = () => {
  const [album, setAlmbu] = useState<Album | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const getAlbum = (id: string) => {
    setLoading(true);
    getAlbumService(id)
      .then((album) => {
        const image = `${getEndpointURL(ALBUM_COVER_ENDPOINT)}&${ID_QUERY}${
          album.coverArt
        }`;
        setAlmbu({ ...album, image });
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  };
  
  return {
    getAlbum,
    album,
    error,
    loading,
  };
};
