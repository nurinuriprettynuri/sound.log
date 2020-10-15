import { TrackImage } from "./trackStyledComponents";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ProfileTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
  width: 100%;
  align-items: center;
  padding: 40px;
  background-size: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  background-image: url(${(props) => props.img});
  position: relative;
  margin-bottom: 20px;
`;

export const Paragraph = styled.p`
  width: 100%;
  font-size: 20px;
  margin: 3px 0;
  color: #fff;
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  padding: 2px;
  border-radius: 3px;
  width: 26px;
  align-items: center;
  position: absolute;
  right: 2%;
  bottom: 2%;
`;

export const ProfileImage = styled(TrackImage)`
  border-radius: 50%;
  margin-bottom: 10px;
  width: 280px;
  height: 280px;
  border: 1px solid #ccc;
`;
