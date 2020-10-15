import { ArtistProfile } from "./artistProfile";
import { connect } from "react-redux";
import { fetchArtist } from "../../redux/actions/artistAction";
import { fetchAllTracks } from "../../redux/actions/trackAction";

const mapStateToProps = (
  { tracks, artists },
  {
    match: {
      params: { artistId },
    },
  }
) => ({
  tracks,
  artist: artists[artistId],
  artistId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
  fetchArtist: (artistId) => dispatch(fetchArtist(artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
