/* eslint-disable */
import styled from "styled-components";
import Card from '@material-ui/core/Card';

const CardTitleWhite = styled.h4 `
    color: #FFFFFF;
    margin-top: 0px;
    min-height: auto;
    font-weight: 300;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    margin-bottom: 3px;
    text-decoration: none;
`;
const GridWrapper = styled.div `
background-color: #eee;
`;
const AboutWrapper = styled.div `
    background-color: #eee;
    padding: 20px;
    border-radius: 5px;
    box-shadow:0px;
    justify-content:space-around;
    @media (max-width: 900px)
    margin-left:25%;
    min-height: 100vh
`;
const ContainerWrapper = styled.div`
    width:100%;
`;
const CardCategoryWhite = styled.p `
    color: rgba(255,255,255,.62);
    margin: 0;
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 0;
`;
const GridItem = styled.div`
`;
const styles = {
      padding: "10 15px !important"
  };
export {
    GridWrapper,
    AboutWrapper,
    ContainerWrapper,
    CardTitleWhite,
    CardCategoryWhite,
    GridItem

}