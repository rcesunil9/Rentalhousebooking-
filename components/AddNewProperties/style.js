import styled from "styled-components";
import SelectSearch from "react-select-search";
import ImageUploader from "react-images-upload";
import Modal from "react-modal";
import CustomInput from "../shared/Reusable/CustomInput/CustomInput.js";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import GridItem from "../shared/Reusable/Grid/GridItem.js";

const GridWrapper = styled.div`
  background-color: #eee;
`;

const ContainerWrapper = styled.div`
  padding: 50px 0px;
`;

const GridContainerWrapper = styled(GridItem)`
  margin: 0 auto;
`;

const CardTitleWhite = styled.h4`
  color: #ffffff;
  margin-top: 0px;
  min-height: auto;
  font-weight: 300;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  margin-bottom: 3px;
  text-decoration: none;
`;

const Link = styled.a`
  color: darkorange;
  font-size: 15px;
  margin: 20px;
  cursor: pointer;

  :hover {
    color: darkorange;
    text-decoration: underline;
  }
`;

const CircularIcon = styled.svg`
  border-radius: 50%;
  fill: currentColor;
  width: ${(props) => (props.checked ? "20px" : "0px")};
  height: ${(props) => (props.checked ? "20px" : "0px")};
  border: ${(props) =>
    props.checked ? "1px solid #00acc1" : "1px solid rgba(0, 0, 0, .54)"};
  padding: ${(props) => (props.checked ? "0px" : "10px")};
  color: ${(props) => (props.checked ? "#00acc1" : "#fff")};
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
`;

const SearchLocation = styled.div`
  display: inline;
  float: left;
  width: 100%;
`;

const Title = styled.h4`
  color: #aaaaaa;
  font-size: 14px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.42857;
  letter-spacing: unset;
`;

const ProfilePicUploader = styled(ImageUploader)`
  .fileContainer {
    box-shadow: none;

    .chooseFileButton {
      background: #00acc1;
      border-radius: 5px;
      position: absolute;
      bottom: -100%;
      left: 15%;
      padding: 10px 30px;

      :hover {
        background: #00acc1;
      }
    }

    .fileUploader {
      width: 100%;
      height: 72%;
    }

    .uploadPictureContainer {
      width: 20%;
      margin: 0px 10px;
      padding: 0px;
    }
    .uploadPicturesWrapper {
      height: ${(props) => (props.showOtherContent ? "37px" : "115px")};
    }
    .uploadPicturesWrapper > div {
      flex-wrap: unset !important;
    }
    .uploadPictureContainer(n+5) {
      display: none;
    }
    .uploadIcon,
    p {
      display: ${(props) => (props.showOtherContent ? "block" : "none")};
    }

    .deleteImage {
      background: rgb(0, 172, 193);
    }
  }
`;

const Dropdown = styled(SelectSearch)`
  padding: 30px 0px 0px 0px;

  input {
    border: 1px solid transparent;
    font-family: "Noto Sans", sans-serif;
    font-size: 14px;
    line-height: 36px;
    outline: none;
    width: 100%;
  }

  div {
    position: relative;
    background: #fff;
    border-bottom: 1px solid rgb(133, 133, 133);

    > ul {
      list-style: none;
      position: absolute;
      width: 100%;
      left: -8%;
      z-index: 99999;
      display: block;

      button {
        height: 36px;
        background: #fff;
        border: none;
        outline: none;
        font-family: "Noto Sans", sans-serif;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
      }
    }
  }
`;

const ModalContainer = styled(Modal)`
  top: 25%;
  left: 25%;
  right: 25%;
  bottom: 25%;
`;

const ModalButton = styled(Button)`
  left: 40%;
`;

const SubmitPropButton = styled(Button)`
  color: white;
  font-weight: 300;
  font-size: 14px;
  margin: 10px 0;
  transition: all 0.2s ease-in;
  cursor: pointer;
  outline: none;
  border: none;
  background: #00acc1;
  border-radius: 5px;
  position: absolute !important;
  top: 70%;
  right: 20%;
  padding: 10px 30px;
`;

const ErrorMessage = styled.h5`
  text-align: center;
  padding: 0px 10px;
`;

const SaveAvatarButton = styled(Button)`
  top: 27%;
  left: 60%;
  padding: 6px 23px !important;
  text-transform: capitalize !important;
  font-weight: 300 !important;
  font-size: 14px !important;
  font-family: inherit !important;
  color: white !important;
  position: absolute !important;
`;

const DatePicker = styled(CustomInput)`
  ::-webkit-datetime-edit-year-field:not([aria-valuenow]),
  ::-webkit-datetime-edit-month-field:not([aria-valuenow]),
  ::-webkit-datetime-edit-day-field:not([aria-valuenow]) {
    color: transparent !important;
  }
  display: block !important;
`;

const CheckboxContainer = styled.div`
  div {
    display: inline-flex;
    margin-top: 15px;
  }
`;

const CheckboxComponent = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 500;
  padding: 5px 10px;
  font-family: "Noto Sans", sans-serif;
`;

const Subtitle = styled.div`
  margin: 20px 0px;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  font-family: "Noto Sans", sans-serif;
  margin-left: ${(props) => (props.isSpecial ? "20px" : "0px")};
  margin-right: ${(props) => (props.isSpecial ? "20px" : "0px")};
`;

const CheckboxWrapper = styled.div`
  margin-top: 30px;
  margin-left: 25px;
`;

const Footer = styled.div`
  padding-left: 5%;
  margin: 0 auto;
  text-align: center;

  button {
    margin-right: 25px;
  }
`;

const TabContainer = styled.div`
  margin: 10px;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const TabPanelContainer = styled.div`
  padding: 10px 20px;

  .has-focus + label {
    transform: translateY(-56px);
  }
`;

const DropdownLabel = styled.label`
  transform: ${(props) =>
    !!props.flag ? "translateY(-56px)" : "translateY(-37px)"};
  color: #aaaaaa !important;
  font-size: 14px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.42857;
  letter-spacing: unset;
`;

const DescriptionLabel = styled.label`
  color: #aaaaaa !important;
  font-size: 14px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.42857;
  letter-spacing: unset;

  + textarea {
    width: 100%;
    font-size: 12px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.42857;
    display: block;
    margin-top: 10px;
  }
`;

const FieldErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857;
  letter-spacing: unset;
`;

export {
  Title,
  ContainerWrapper,
  GridWrapper,
  GridContainerWrapper,
  CardTitleWhite,
  Link,
  CircularIcon,
  SearchLocation,
  Dropdown,
  ProfilePicUploader,
  ModalContainer,
  ModalButton,
  ErrorMessage,
  SaveAvatarButton,
  SubmitPropButton,
  DatePicker,
  CheckboxContainer,
  CheckboxComponent,
  CheckboxLabel,
  Subtitle,
  CheckboxWrapper,
  Footer,
  TabContainer,
  TabPanelContainer,
  DropdownLabel,
  DescriptionLabel,
  FieldErrorMessage,
};
