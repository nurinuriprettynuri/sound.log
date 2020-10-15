import styled, { css } from "styled-components";

export const SectionTitle = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const ItemTitle = styled.h5`
  margin: 2px 2px 0px;
  font-weight: 300;
  color: ${(props) => props.big && `#999`};
`;

export const GreyH6 = styled.h6`
  font-size: 14px;
  color: #999;
  font-weight: 400;
  margin: 0;
`;

export const TitleSpan = styled.span`
  background-color: #333;
  color: #fff;
  font-size: 16px;
  padding: 4px 7px;
  margin-bottom: 5px;
  ${(props) =>
    props.big &&
    css`
      font-size: 24px;
    `}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
`;
