import styled, { css } from "styled-components";

export const ShowTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 350px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  justify-content: space-between;
  background-image: url(${(props) => props.img});
  position: relative;
`;

export const TrackImage = styled.div`
  object-fit: cover;
  width: 320px;
  height: 320px;
  background-size: cover;
  transition: transform 0.2s;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  cursor: pointer;
  ${(props) =>
    props.small &&
    css`
      width: 180px;
      height: 180px;
    `}
`;

export const RowTrackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const TrackItemButtonDiv = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
`;

export const TrackArtistProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #d6cee2;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  ${(props) =>
    props.small &&
    css`
      background-color: #fdd5e0;
      width: 40px;
      height: 40px;
    `}
`;
