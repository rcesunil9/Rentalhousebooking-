import styled from "styled-components";

const GridWrapper = styled.div `
    background-color: #eee;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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

export {
    GridWrapper,
    CardCategoryWhite,
    CardTitleWhite
}