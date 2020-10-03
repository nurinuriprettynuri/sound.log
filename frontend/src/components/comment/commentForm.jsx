import React from "react";
import styled from "styled-components";
import { CommentInputDiv } from "../wrapper/wrapper";
import { useForm } from "react-hook-form";

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

export const CommentForm = ({ userId, trackId, createComment }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.userId = userId;
    data.trackId = trackId;

    createComment(data);
  };

  return (
    <CommentInputDiv onSubmit={handleSubmit(onSubmit)}>
      <MiniProfilePicture />
      <CommentInput name="body" ref={register({ required: true })} />
      <CommentButton value="submit" />
    </CommentInputDiv>
  );
};
