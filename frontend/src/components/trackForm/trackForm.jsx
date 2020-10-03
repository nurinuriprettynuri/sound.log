import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { RowSection, CenterWrapper } from "../wrapper/wrapper";

import {
  TitleP,
  WideForm,
  FileInput,
  BasicSelect,
  SubmitButton,
  FormTitleDiv,
  FormContainer,
  BasicTextArea,
  BasicFormInput,
  BasicInputLabel,
  FormImagePreview,
  FormLeftContainer,
  FormWarningSpan,
} from "../designSystem/basicForm";
import { useForm } from "react-hook-form";

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`;

export const TrackUploadForm = ({
  fetchAllGenres,
  handleTrackSubmit,
  fetchTrack,
  genres,
  artist,
  history,
  track,
  trackId,
  formType,
}) => {
  const { register, handleSubmit, errors } = useForm();

  //image preview hook
  const [imgData, setImgData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (formType === "Edit") {
      fetchAllGenres()
        .then(() => fetchTrack(trackId))
        .then(() => setLoading(false));
    } else {
      fetchAllGenres().then(() => setLoading(false));
    }
  }, []);

  if (isLoading) return null;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("artist", artist);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    if (data.audio[0]) {
      console.log(data.audio[0]);
      formData.append("audio", data.audio[0]);
    }
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    handleTrackSubmit(formData, trackId).then((res) => history.push(`/tracks`));
  };

  return (
    <CenterWrapper>
      <FormContainer>
        <FormTitleDiv>
          <TitleP>Basic Info</TitleP>
        </FormTitleDiv>
        <RowSection>
          <FormLeftContainer>
            <FormImagePreview img={(track && track.imageUrl) || imgData} />
          </FormLeftContainer>
          <WideForm onSubmit={handleSubmit(onSubmit)}>
            <BasicInputLabel>Title</BasicInputLabel>
            <BasicFormInput
              name="title"
              ref={register({ required: true })}
              defaultValue={track ? track.title : ""}
            />
            {errors.title && errors.title.type === "required" && (
              <FormWarningSpan>Title is required</FormWarningSpan>
            )}
            <BasicInputLabel>Genre</BasicInputLabel>
            <BasicSelect
              name="genre"
              ref={register({ required: true })}
              defaultValue={track ? track.genre : ""}
            >
              <option disabled>------Select------</option>
              {genres.length &&
                genres.map((e) => (
                  <option defaultValue={e.type}>{e.type}</option>
                ))}
            </BasicSelect>
            {errors.genre && errors.genre.type === "required" && (
              <FormWarningSpan>Genre is required</FormWarningSpan>
            )}
            <BasicInputLabel>Description</BasicInputLabel>
            <BasicTextArea
              name="description"
              ref={register({ required: true })}
              defaultValue={track ? track.description : ""}
            />
            <BasicInputLabel>
              Audio
              <FileInput
                name="audio"
                ref={register({ required: formType !== "Edit" })}
              />
            </BasicInputLabel>
            {errors.audio && errors.audio.type === "required" && (
              <FormWarningSpan>Audio is required</FormWarningSpan>
            )}
            <BasicInputLabel>
              Image
              <FileInput
                name="image"
                ref={register()}
                onChange={onChangePicture}
              />
            </BasicInputLabel>
            <ButtonWrapper>
              <SubmitButton cancel={`cancel`}>Cancel</SubmitButton>
              <SubmitButton value="submit">Submit</SubmitButton>
            </ButtonWrapper>
          </WideForm>
        </RowSection>
      </FormContainer>
    </CenterWrapper>
  );
};
