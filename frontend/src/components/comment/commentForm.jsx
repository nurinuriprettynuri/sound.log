import React from "react";
import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import { CommentInputDiv } from "../designSystem/commentStyledComponents";
import { useForm } from "react-hook-form";

const MiniProfilePicture = styled.div`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #dcfffb;
  background-image: url(${(props) => props.img});
  background-size: cover;
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
  background-color: #fff;
  cursor: pointer;
`;

export const CommentForm = ({ userId, trackId, createComment, avatar }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    data.userId = userId;
    data.trackId = trackId;

    createComment(data);
    e.target.reset();
  };

  return (
    <CommentInputDiv onSubmit={handleSubmit(onSubmit)}>
      <MiniProfilePicture img={avatar} />
      <CommentInput name="body" ref={register({ required: true })} />
      <CommentButton value="submit">
        <DoneIcon />
      </CommentButton>
    </CommentInputDiv>
  );
};
