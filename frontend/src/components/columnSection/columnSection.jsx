import React from "react";
import { ColSection, BottomBorderDiv } from "../designSystem/wrapper";
import { GreyH6 } from "../designSystem/textStyledComponents";
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
