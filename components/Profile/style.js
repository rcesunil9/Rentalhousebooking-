import styled from "styled-components";
import ImageUploader from 'react-images-upload';
import Radio from "@material-ui/core/Radio";
import GridItem from "../shared/Reusable/Grid/GridItem.js";

const GridWrapper = styled.div `
    background-color: #eee;
`;

const ContainerWrapper = styled.div`
    padding: 50px 0px;
`;

const GridContainerWrapper = styled(GridItem) `
    margin: 0 auto;
`;

const CardCategoryWhite = styled.p `
    color: rgba(255,255,255,.62);
    margin: 0;
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 0;
`;

const CardTitleWhite = styled.h4 `
    color: #FFFFFF;
    margin-top: 0px;
    min-height: auto;
    font-weight: 300;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    margin-bottom: 3px;
    text-decoration: none;
`;

const Link = styled.a `
    color: #337ab7;
    font-size: 15px;
    margin-right: 20px;

    : hover {
        color: #337ab7;
        text-decoration: underline;
    }
`;

const ProfilePicUploader = styled(ImageUploader)`
    .fileContainer {
        background: none;
        box-shadow: none;
        position: absolute;
        padding: 0px 42px;
        border-radius: 10px;

        img, p {
            display: none;
        }
    }
`;

const GenderRadio = styled(Radio)`
    border-radius: 50%;
    width: ${(props) => (props.checked ? '20px' : '0px')};
    height: ${(props) => (props.checked ? '20px' : '0px')};
    padding: ${(props) => (props.checked ? '0px 20px !important' : '10px 20px !important')};
    color: ${(props) => (props.checked ? '#00acc1' : '#000')};
`;

const CircularIcon = styled.svg`
    border-radius: 50%;
    fill: currentColor;
    width: ${(props) => (props.checked ? '20px' : '0px')};
    height: ${(props) => (props.checked ? '20px' : '0px')};
    border: ${(props) => (props.checked ? '1px solid #00acc1' : '1px solid rgba(0, 0, 0, .54)')};
    padding: ${(props) => (props.checked ? '0px' : '10px')};
    color: ${(props) => (props.checked ? '#00acc1' : '#fff')};
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
`;

const GenderLabel = styled.label`
    color: #AAAAAA;
    font-size: 12px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.42857;
    letter-spacing: unset;
`;

export {
    ProfilePicUploader,
    ContainerWrapper,
    GridWrapper,
    GridContainerWrapper,
    CardCategoryWhite,
    CardTitleWhite,
    Link,
    GenderRadio,
    CircularIcon,
    GenderLabel
}