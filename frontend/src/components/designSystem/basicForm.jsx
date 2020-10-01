import styled from "styled-components";

export const BasicFormInput = styled.input`
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
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
  font-size: 14px;
  padding: 0 5px;
  text-align: left;
  margin-bottom: 3px;
`;

export const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

export const BasicTextArea = styled.textarea`
  border: 1px solid #ccc;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  padding: 5px;
  box-shadow: none;
  &: focus {
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
