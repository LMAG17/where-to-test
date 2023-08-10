import axios from "axios";
import { getEndpointURL } from "../Utils/serverUrl";
import { ALBUM_ENDPOINT, GET_ALBUM_ENDPOINT, ID_QUERY } from "../constanst/server";

export const getAlbumsService = (type: string) => {
  return new Promise<Album[]>((resolve, reject) => {
    const url = `${getEndpointURL(ALBUM_ENDPOINT)}&type=${type}`;
    axios
      .get(url)
      .then((res) => {
        const response = res.data as AlbumResponse;
        if (response["subsonic-response"].albumList2) {
          resolve(response["subsonic-response"].albumList2.album ?? []);
        } else {
          reject("There is no albumList2");
        }
      })
      .catch((err) => reject(err));
  });
};

export const getAlbumService = (id: string) => {
  return new Promise<Album>((resolve, reject) => {
    const url = `${getEndpointURL(GET_ALBUM_ENDPOINT)}&${ID_QUERY}${id}`;
    axios
      .get(url)
      .then((res) => {
        const response = res.data as AlbumResponse;
        if (response["subsonic-response"].album) {
          resolve(response["subsonic-response"].album);
        } else {
          reject("There is no Album");
        }
      })
      .catch((err) => reject(err));
  });
};
