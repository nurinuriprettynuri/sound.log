import React from "react";
import {
  ProfileImage,
  CommentShowDiv,
  BottomBorderDiv,
} from "../wrapper/wrapper";
import { TextContainer } from "../text/textContainer";
import { GreyH6, ItemTitle } from "../text/text";
import styled from "styled-components";

const CommentTextContainer = styled(TextContainer)`
  margin-left: 15px;
`;

const CommentTitleDiv = styled(BottomBorderDiv)``;

export const Comment = ({ username, content }) => {
  return (
    <CommentShowDiv>
      <ProfileImage small={true} />
      <CommentTextContainer>
        <GreyH6>{username}</GreyH6>
        <ItemTitle>{content}</ItemTitle>
      </CommentTextContainer>
    </CommentShowDiv>
  );
};
