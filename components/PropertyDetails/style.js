import styled from "styled-components";

const PropertyItem = styled.article `
    margin: 30px 15px 0px;
    position: relative;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;

    img {
        width: 100%;
        height: 224px;
    }

    .thumbs-wrapper {
        display: none;
    }
`;

const PropertyTag = styled.div `
    color: #fff;
    padding: 6px 10px;
    position: absolute;
    left: 15px;
    top: -5px;
    font-size: 12px;
    background-color: ${props => !props.hotProperty ? '#20ceb3' : '#ff0000'};
`;

const PropertyItemContent = styled.div `
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 5px;
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

const PropertyInfo = styled.div `
    padding: 5px 0px;
    align-items: center;
    border-bottom: 1px solid #ddd;
    display: flex;
`;

const PropertyInfoDetails = styled.div `
    font-size: 15px;
    font-weight: bold;
`;

const PropertyDescription = styled.div `
    display: flex;
    padding: 10px 0px;
`;

const PropertyDetailSection = styled.div `
    border-top: 1px solid #ddd;
`;

const PropertyPrice = styled.div `
    font-size: 16px;
    font-weight: 500;
    text-align: center;
`;

const PaginationWrapper = styled.div`
    font-size: 14px;
    justify-content: center;
    display: flex;
`;

const PaginationButton = styled.input `
    background-color: #00acc1;
    border: 2px solid #00acc1;
    border-radius: 5px;
    color: white;
    padding: 5px 10px;
    margin: 5px 15px 0px;
`;

const NoPropertyWidget = styled.div `
    display: flex;
    justify-content: center;
`;

const PropertyItemModal = styled.article`
    img {
        width: 70vw;
        height: 88vh;
    }
    display: flex;
    position: relative;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    .thumbs-wrapper {
        display: none;
    }
    .MuiDialog-paper {
        max-width: 920px !important;
    }
`;

const Advertisement = styled.div`
    border: 1px solid #ddd;
    height: 50vh;
    margin-top: 30px;
    position: sticky;
    top: 0%;
    right: 0px;
    background-color: white;
    text-align: center;
`;

export {
    PropertyItem,
    PropertyTag,
    PropertyItemContent,
    PropertyInfo,
    PropertyInfoDetails,
    PropertyDescription,
    PropertyDetailSection,
    PropertyPrice,
    PaginationWrapper,
    PaginationButton,
    CardTitleWhite,
    NoPropertyWidget,
    PropertyItemModal,
    Advertisement
}
