import React, { useEffect, useState } from "react";
import { CenterWrapper, ColSection, RowWrapper } from "../designSystem/wrapper";

import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { TitleSpan } from "../designSystem/textStyledComponents";
import show_bg from "../../images/show_background.jpg";
import selfie from "../../images/selfie.jpeg";

import {
  ProfileTopWrapper,
  Paragraph,
  LinkButton,
  ProfileImage,
} from "../designSystem/profileStyledComponents";

const ProfileCol = styled(ColSection)`
  padding: 0 20px;
`;

export const UserProfile = ({ fetchUser, currentUser }) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchUser(currentUser.userId).then(() => setLoading(false));
  }, []);
  if (isLoading) {
    return null;
  }
  const mapped = (
    <React.Fragment>
      <TitleSpan big={true}>{currentUser.username}</TitleSpan>
      <Paragraph>{currentUser.location}</Paragraph>
    </React.Fragment>
  );

  return (
    <CenterWrapper>
      <ProfileTopWrapper img={show_bg}>
        <ProfileImage img={currentUser.avatar || selfie} />
        <ProfileCol>{mapped}</ProfileCol>
        <LinkButton to="/you/edit">
          <EditIcon />
        </LinkButton>
      </ProfileTopWrapper>

      <RowWrapper></RowWrapper>
    </CenterWrapper>
  );
};
