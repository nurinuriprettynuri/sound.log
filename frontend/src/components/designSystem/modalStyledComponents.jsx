import styled from "styled-components";
import { TrackItemButtonDiv } from "./trackStyledComponents";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: hsla(0, 0%, 94.9%, 0.9);
  z-index: 20;
`;

export const ModalClearDiv = styled(TrackItemButtonDiv)`
  top: 0;
  right: 1%;
`;
