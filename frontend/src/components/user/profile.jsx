import React, { useEffect, useState } from "react";
import {
  CenterWrapper,
  ShowTopWrapper,
  ColSection,
  RowWrapper,
} from "../wrapper/wrapper";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { TrackImage } from "../trackImage/trackImage";
import styled from "styled-components";
import { TitleSpan } from "../text/text";
import show_bg from "../../images/show_background.jpg";
import selfie from "../../images/selfie.jpeg";
import { ProfileImage } from "../designSystem/basicForm";

const Paragraph = styled.p`
  width: 100%;
  font-size: 20px;
  margin: 3px 0;
  color: #fff;
`;

const ProfileTopWrapper = styled(ShowTopWrapper)`
  height: 400px;
  align-items: center;
  padding: 40px;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  padding: 2px;
  border-radius: 3px;

  width: 26px;
  align-items: center;
  position: absolute;
  right: 2%;
  bottom: 2%;
`;

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
