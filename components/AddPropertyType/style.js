import styled from "styled-components";
import SelectSearch from 'react-select-search';
import GridItem from "../shared/Reusable/Grid/GridItem.js";

const GridWrapper = styled.div `
    background-color: #eee;
    min-height: 84vh;
`;

const ContainerWrapper = styled.div`
    padding: 50px 0px;
`;

const GridContainerWrapper = styled(GridItem) `
    margin: 0 auto;
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

const SearchPropertyType = styled.div `
    display: inline;
    float: left;
    width: 100%;
`;

const Title = styled.h4`
    color: #AAAAAA;
    font-size: 14px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.42857;
    letter-spacing: unset;
`;

const Dropdown = styled(SelectSearch) `

    input {
        padding: 0 16px;
        border: 1px solid transparent;
        font-family: 'Noto Sans',sans-serif;
        font-size: 14px;
        line-height: 36px;
    }

    div {
        background: #fff;
        box-shadow: 0 .0625rem .125rem rgba(0, 0, 0, 0.15);

         > ul {
            list-style: none;
            position: absolute;
            width: 100%;
            z-index: 99999;
            display: block;
            right: 4.5%;

                button {
                    display: block;
                    height: 36px;
                    width: 100%;
                    background: #fff;
                    border: none;
                    outline: none;
                    font-family: 'Noto Sans', sans-serif;
                    font-size: 14px;
                    text-align: left;
                    cursor: pointer;
                }
        }
    }
    
`;

export {
    Title,
    ContainerWrapper,
    GridWrapper,
    GridContainerWrapper,
    CardTitleWhite,
    Link,
    CircularIcon,
    SearchPropertyType,
    Dropdown
}