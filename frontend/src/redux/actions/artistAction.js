import * as APIUtil from "../../util/authApi";

export const RECEIVE_ARTIST = "RECEIVE_ARTIST";
export const RECEIVE_ALL_ARTISTS = "RECEIVE_ALL_ARTISTS";

const receiveArtist = (artist) => ({
  type: RECEIVE_ARTIST,
  artist,
});

export const fetchArtist = (artistId) => (dispatch) =>
  APIUtil.fetchUser(artistId).then((res) => dispatch(receiveArtist(res.data)));
