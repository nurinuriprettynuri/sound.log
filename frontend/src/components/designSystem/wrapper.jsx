import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  width: 100vw;
  box-sizing: border-box;
  min-width: 900px;
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 15px;
  align-items: center;
`;

export const CenterWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  padding-bottom: 80px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 1240px;
  min-width: 900px;
  background-color: #fff;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-image: url(${(props) => props.img});
`;

export const MiddleWrapper = styled.div`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const BottomWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  padding-bottom: 40px;
  box-sizing: border-box;
  height: auto;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 25px;
  background-color: #fff;
  box-sizing: border-box;
  min-height: 500px;
`;

export const ColSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
`;

export const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const VerticalLine = styled.div`
  border-left: 2px solid #f2f2f2;
  margin: 0 20px;
`;

export const BottomBorderDiv = styled.div`
  padding-top: 4px;
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #f2f2f2;
`;
