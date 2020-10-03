import styled, { css } from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  width: 100vw;
  min-width: 900px;
  overflow-x: scroll;
  height: 100%;
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
  flex-direction: column;
  align-items: center;
  width: 90%;
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

export const ButtomWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  padding-bottom: 40px;
  box-sizing: border-box;
  height: 600px;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: flex;
  padding: 5px 25px;
  background-color: #fff;
  box-sizing: border-box;
`;

export const RowkWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CommentInputDiv = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px 5px 0;
  height: 40px;
  width: 100%;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

export const CommentShowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
`;

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ccc;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  ${(props) =>
    props.small &&
    css`
      width: 40px;
      height: 40px;
    `}
`;

export const ColSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const VerticalLine = styled.div`
  border-left: 2px solid #f2f2f2;
`;

export const BottomBorderDiv = styled.div`
  padding-top: 4px;
  display: flex;
  align-items: center;
  height: 30px;

  border-bottom: 1px solid #f2f2f2;
`;

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
