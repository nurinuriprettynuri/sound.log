import React from "react";
import { ColSection, BottomBorderDiv } from "../wrapper/wrapper";
import { GreyH6 } from "../text/text";
import styled from "styled-components";

const SectionTitleDiv = styled(BottomBorderDiv)`
  width: 100%;
  height: 30px;
`;

export const ColumnSection = ({ title, children }) => {
  return (
    <ColSection>
      <SectionTitleDiv>
        <GreyH6>{title}</GreyH6>
      </SectionTitleDiv>
      {children}
    </ColSection>
  );
};
