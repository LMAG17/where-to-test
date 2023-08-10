import {
  BASE_URL,
  CLIENT_APP,
  FORMAT,
  PASSWORD_QUERY,
  SERVER_PASSWORD,
  SERVER_USER,
  SERVER_VERSION,
  USER_QUERY,
  VERSION_QUERY,
} from "../constanst/server";

export const getEndpointURL = (endpoint: string) => {
  const url = `${BASE_URL}${endpoint}?${USER_QUERY}${SERVER_USER}&${PASSWORD_QUERY}${SERVER_PASSWORD}&${VERSION_QUERY}${SERVER_VERSION}&${CLIENT_APP}&${FORMAT}`;
  return url;
};
