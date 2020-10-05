import React from "react";
import { ProfileImage, CommentShowDiv } from "../wrapper/wrapper";
import { TextContainer } from "../text/textContainer";
import { GreyH6, ItemTitle } from "../text/text";
import styled from "styled-components";

const CommentTextContainer = styled(TextContainer)`
  margin-left: 15px;
`;

export const Comment = ({ username, content, avatar }) => {
  return (
    <CommentShowDiv>
      <ProfileImage small={true} img={avatar} />
      <CommentTextContainer>
        <GreyH6>{username}</GreyH6>
        <ItemTitle>{content}</ItemTitle>
      </CommentTextContainer>
    </CommentShowDiv>
  );
};
