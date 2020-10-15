import React from "react";
import { TrackArtistProfileImage } from "../designSystem/trackStyledComponents";
import { CommentShowDiv } from "../designSystem/commentStyledComponents";

import {
  GreyH6,
  ItemTitle,
  TextContainer,
} from "../designSystem/textStyledComponents";
import styled from "styled-components";

const CommentTextContainer = styled(TextContainer)`
  margin-left: 15px;
`;

export const Comment = ({ username, content, avatar }) => {
  return (
    <CommentShowDiv>
      <TrackArtistProfileImage small={true} img={avatar} />
      <CommentTextContainer>
        <GreyH6>{username}</GreyH6>
        <ItemTitle>{content}</ItemTitle>
      </CommentTextContainer>
    </CommentShowDiv>
  );
};
