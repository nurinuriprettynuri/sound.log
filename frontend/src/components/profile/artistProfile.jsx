import React, { useEffect, useState } from "react";
import { CenterWrapper, ColSection } from "../designSystem/wrapper";
import { TitleSpan } from "../designSystem/textStyledComponents";
import styled from "styled-components";
import selfie from "../../images/selfie.jpeg";
import EditIcon from "@material-ui/icons/Edit";
import {
  ProfileTopWrapper,
  Paragraph,
  LinkButton,
  ProfileImage,
} from "../designSystem/profileStyledComponents";
import { TrackIndexRow } from "../trackIndexRow/trackIndexRow";
import show_bg from "../../images/show_background.jpg";

const ProfileCol = styled(ColSection)`
  padding: 0 20px;
`;

export const ArtistProfile = ({
  fetchArtist,
  fetchAllTracks,
  tracks,
  artist,
  artistId,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchArtist(artistId), fetchAllTracks()]).then(() =>
      setLoading(false)
    );
  }, []);

  if (isLoading) {
    return null;
  }

  const mapped = (
    <React.Fragment>
      <TitleSpan big={true}>{artist.username}</TitleSpan>
      <Paragraph>{artist.location}</Paragraph>
    </React.Fragment>
  );

  const tracksByArtist = Object.keys(tracks)
    .filter((e, idx) => tracks[e].artistId === artist.userId)
    .reduce((result, curr) => {
      result.push(tracks[curr]);
      return result;
    }, []);

  return (
    <CenterWrapper>
      <ProfileTopWrapper img={show_bg}>
        <ProfileImage img={artist.avatar || selfie} />
        <ProfileCol>{mapped}</ProfileCol>
        <LinkButton to="/you/edit">
          <EditIcon />
        </LinkButton>
      </ProfileTopWrapper>
      <TrackIndexRow
        tracks={tracksByArtist}
        title={`Tracks By ${artist.username}`}
        subTitle={`Explore the artist`}
      />
    </CenterWrapper>
  );
};
