import React from "react";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import { RowSection, ColSection } from "../wrapper/wrapper";
import { TrackImage } from "../trackImage/trackImage";
import {
  BasicForm,
  TitleDiv,
  TitleP,
  BasicFormInput,
  BasicInputLabel,
  BasicTextArea,
  BasicButton,
  BasicSelect,
} from "../form/basicForm";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { fetchAllGenres } from "../../redux/actions/genreAction";
import { createTrack } from "../../redux/actions/trackAction";

const mapStateToProps = (state, ownProps) => {
  return {
    genres: state.genres,
    artist_id: state.user.userId,
    history: ownProps.history,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllGenres: () => dispatch(fetchAllGenres()),
  createTrack: (track) => dispatch(createTrack(track)),
});

const TrackFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 25px 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: #fff;

  height: 600px;
`;

const TrackLeftContainer = styled(ColSection)`
  display: flex;
  align-items: center;
  width: 40%;
`;

const TrackForm = styled(BasicForm)`
  width: 60%;
  padding: 20px;
  align-items: flex-start;
`;

const TrackImagePreview = styled(TrackImage)`
  width: 260px;
  height: 260px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const FileInput = styled.input.attrs({
  type: "file",
})`
  margin-left: 10px;
`;

const SubmitButton = styled(BasicButton)`
  width: 80px;
  height: 30px;
  font-size: 15px;
  margin-left: 5px;
  ${(props) =>
    props.cancel &&
    css`
      color: #999;
      background-color: #fff;
      border: 1px solid #999;
    `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`;

const TrackFormTitleDiv = styled(TitleDiv)`
  margin-bottom: 30px;
`;

const TrackUploadForm = ({
  fetchAllGenres,
  genres,
  createTrack,
  artist_id,
  history,
}) => {
  const { register, handleSubmit } = useForm();

  //for image preview
  const [imgData, setImgData] = React.useState(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    fetchAllGenres();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("artist_id", "7d980ac7-dd7b-4762-a58f-d64159551aa1");
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("audio", data.audio[0]);
    formData.append("image", data.image[0]);
    createTrack(formData).then((res) =>
      history.push(`/tracks/:${res.track.track_id}`)
    );
  };

  return (
    <TrackFormContainer>
      <TrackFormTitleDiv>
        <TitleP>Basic Info</TitleP>
      </TrackFormTitleDiv>
      <RowSection>
        <TrackLeftContainer>
          <TrackImagePreview img={imgData} />
        </TrackLeftContainer>
        <TrackForm onSubmit={handleSubmit(onSubmit)}>
          <BasicInputLabel>Title</BasicInputLabel>
          <BasicFormInput name="title" ref={register({ required: true })} />
          <BasicInputLabel>Genre</BasicInputLabel>
          <BasicSelect name="genre" ref={register({ required: true })}>
            <option value="none" selected disabled>
              ------Select------
            </option>
            {genres.length &&
              genres.map((e) => <option value={e.genre_id}>{e.type}</option>)}
          </BasicSelect>
          <BasicInputLabel>Description</BasicInputLabel>
          <BasicTextArea
            name="description"
            reg={register({ required: true })}
          />
          <BasicInputLabel>
            Audio
            <FileInput name="audio" ref={register({ required: true })} />
          </BasicInputLabel>
          <BasicInputLabel>
            Image
            <FileInput
              name="image"
              ref={register({ required: false })}
              onChange={onChangePicture}
            />
          </BasicInputLabel>
          <ButtonWrapper>
            <SubmitButton cancel={`cancel`}>Cancel</SubmitButton>
            <SubmitButton value="submit">Submit</SubmitButton>
          </ButtonWrapper>
        </TrackForm>
      </RowSection>
    </TrackFormContainer>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrackUploadForm)
);
