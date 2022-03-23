import styled from "styled-components";

const GridWrapper = styled.div `
    background-color: #eee;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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
    CardTitleWhite
}