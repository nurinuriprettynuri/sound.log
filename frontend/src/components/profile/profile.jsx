import React, { useEffect, useState } from "react";
import { CenterWrapper, ColSection, RowWrapper } from "../designSystem/wrapper";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { TitleSpan } from "../designSystem/textStyledComponents";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import show_bg from "../../images/show_background.jpg";

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

  const useStyles = makeStyles({
    icon: {
      color: "#fff",
      opacity: "0.7",
      "&:hover": { color: "#dc4e76" },
    },
  });
  const classes = useStyles();
  useEffect(() => {
    fetchUser(currentUser.userId).then(() => setLoading(false));
  }, []);
  if (isLoading) {
    return null;
  }
  const mapped = (
    <React.Fragment>
      <TitleSpan big={true}>{currentUser.username}</TitleSpan>
      {currentUser.location && (
        <TitleSpan big={false}>{currentUser.location}</TitleSpan>
      )}
      <div>
        <Paragraph>{currentUser.bio}</Paragraph>
      </div>
    </React.Fragment>
  );

  return (
    <CenterWrapper>
      <ProfileTopWrapper img={show_bg}>
        <ProfileImage img={currentUser.avatar || ""} />
        <ProfileCol>{mapped}</ProfileCol>
        <LinkButton to="/you/edit">
          <Tooltip title="Edit profile">
            <EditIcon className={classes.icon} />
          </Tooltip>
        </LinkButton>
      </ProfileTopWrapper>

      <RowWrapper></RowWrapper>
    </CenterWrapper>
  );
};
