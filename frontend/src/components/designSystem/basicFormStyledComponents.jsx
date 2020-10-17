import styled, { css } from "styled-components";
import { ColSection } from "./wrapper";
import { TrackImage } from "./trackStyledComponents";

export const BasicFormInput = styled.input`
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 25px;
  margin-bottom: 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  letter-spacing: 0.6px;
  padding: 5px;
  box-shadow: none;
  &: focus {
    outline: none;
    border: 1px solid #333;
  }
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 62px;
`;

export const TitleP = styled.p`
  color: #333;
  font-size: 30px;
  width: 100%;
  margin: 0;
  height: 100%;
  text-align: center;
`;

export const BasicInputLabel = styled.label`
  display: inline-block;
  width: 100%;
  color: #333;
  font-size: 13px;
  padding: 0 3px;
  text-align: left;
  margin-bottom: 3px;
  margin-top: 5px;
`;

export const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  autocomplete: "off";
`;

export const BasicTextArea = styled.textarea`
  border: 1px solid #ccc;
  width: 100%;
  height: 150px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", "Geneva, Verdana, sans-serif";
  letter-spacing: 0.6px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  padding: 5px;
  box-shadow: none;
  &:focus {
    outline: none;
    border: 1px solid #333;
  }
  margin-bottom: 20px;
`;

export const BasicButton = styled.button`
  padding: 5px;
  text-align: center;
  height: 40px;
  background-color: #ec9706;
  border-radius: 4px;
  border: none;
  font-size: 17px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: #fff;
  margin-top: 10px;
  &: focus {
    outline: none;
  }
  cursor: pointer;
`;

export const BasicSelect = styled.select`
  background-color: #fff;
  box-sizing: border-box;
  height: 25px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  box-shadow: none;
  &: focus {
    outline: none;
    border: 1px solid #333;
  }
`;

export const BasicOption = styled.option`
  background-color: #fff;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 25px 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 20px;
  height: 630px;
`;

export const FileInput = styled.input.attrs({
  type: "file",
})`
  margin-left: 10px;
`;

export const WideForm = styled(BasicForm)`
  width: 60%;
  padding: 20px;
  align-items: flex-start;
`;

export const SubmitButton = styled(BasicButton)`
  width: 80px;
  height: 30px;
  font-size: 15px;
  margin-left: 5px;
  ${(props) =>
    props.cancel &&
    css`
      color: #999;
      background-color: #fff;
      border: 1px solid #999;
    `}
`;

export const FormLeftContainer = styled(ColSection)`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  width: 40%;
  padding-left: 30px;
`;

export const FormImagePreview = styled(TrackImage)`
  width: 260px;
  height: 260px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const FormTitleDiv = styled(TitleDiv)`
  margin-bottom: 30px;
  justify-content: flex-start;
`;

export const FormWarningSpan = styled.span`
  font-size: 12px;
  color: red;
  margin-left: 2px;
`;
