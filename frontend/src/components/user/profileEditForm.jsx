import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RowSection, CenterWrapper } from "../wrapper/wrapper";
import {
  TitleP,
  WideForm,
  FileInput,
  FormTitleDiv,
  SubmitButton,
  BasicTextArea,
  FormContainer,
  BasicFormInput,
  BasicInputLabel,
  FormLeftContainer,
  ProfileImage,
  FormWarningSpan,
} from "../designSystem/basicForm";
import { useForm } from "react-hook-form";
import selfie from "../../images/selfie.jpeg";

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`;

export const ProfileEditForm = ({
  updateUser,
  fetchUser,
  currentUser,
  history,
}) => {
  const { register, handleSubmit, watch, errors } = useForm();

  //for image preview
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
    fetchUser(currentUser.userId).then(() => setLoading(false));
  }, []);

  if (isLoading) return null;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("location", data.location);
    formData.append("bio", data.bio);
    data.password && formData.append("password", data.password);
    data.avatar && formData.append("avatar", data.avatar[0]);

    updateUser(formData, currentUser.userId).then((res) =>
      history.push(`/you`)
    );
  };

  return (
    <CenterWrapper>
      <FormContainer>
        <FormTitleDiv>
          <TitleP>Edit Profile Info</TitleP>
        </FormTitleDiv>
        <RowSection>
          <FormLeftContainer>
            <ProfileImage img={currentUser.avatar || selfie} />
            <BasicInputLabel>
              <FileInput
                name="avatar"
                ref={register()}
                onChange={onChangePicture}
              />
            </BasicInputLabel>
          </FormLeftContainer>
          <WideForm onSubmit={handleSubmit(onSubmit)}>
            <BasicInputLabel>Displayname</BasicInputLabel>
            <BasicFormInput
              name="username"
              ref={register({ required: true })}
              defaultValue={currentUser.username}
            />
            {errors.username && errors.username.type === "required" && (
              <FormWarningSpan>Username is required</FormWarningSpan>
            )}

            <BasicInputLabel>Email</BasicInputLabel>
            <BasicFormInput
              name="email"
              ref={register({ required: true })}
              defaultValue={currentUser.email}
            />
            {errors.email && errors.email.type === "required" && (
              <FormWarningSpan>Email is required</FormWarningSpan>
            )}
            <BasicInputLabel>Renew Password</BasicInputLabel>
            <BasicFormInput type="password" name="password" ref={register()} />
            <BasicInputLabel>Confirm Password</BasicInputLabel>
            <BasicFormInput
              type="password"
              name="passwordConfirm"
              ref={register({ validate: (val) => val === watch("password") })}
            />
            {errors.passwordConfirm && (
              <FormWarningSpan>Password have to match</FormWarningSpan>
            )}
            <BasicInputLabel>Location</BasicInputLabel>
            <BasicFormInput
              name="location"
              ref={register({ required: false })}
              defaultValue={currentUser.location || ""}
            />
            <BasicInputLabel>Bio</BasicInputLabel>
            <BasicTextArea
              name="bio"
              ref={register({ required: false })}
              defaultValue={currentUser.bio || ""}
            />

            <ButtonWrapper>
              <SubmitButton
                onClick={() => history.push("/you")}
                cancel={`cancel`}
              >
                Cancel
              </SubmitButton>
              <SubmitButton value="submit">Submit</SubmitButton>
            </ButtonWrapper>
          </WideForm>
        </RowSection>
      </FormContainer>
    </CenterWrapper>
  );
};
