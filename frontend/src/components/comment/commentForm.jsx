import React from "react";
import styled from "styled-components";
import { CommentInputDiv } from "../wrapper/wrapper";

const MiniProfilePicture = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const CommentInput = styled.input`
  width: 90%;
  height: 100%;
  border: 1px solid #e5e5e5;
  padding: 0 0px 0 9px;
  margin-left: 5px;
  margin-right: 5px;

  &:focus {
    outline: none;
  }
`;

const CommentButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const CommentForm = () => {
  return (
    <CommentInputDiv>
      <MiniProfilePicture />
      <CommentInput />
      <CommentButton />
    </CommentInputDiv>
  );
};
