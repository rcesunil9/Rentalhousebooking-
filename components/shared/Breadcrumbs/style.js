import styled from "styled-components";

const BreadcrumbContainer = styled.div`
    background-color: #fff;
    font-size: 15px;
    display: flex;
    width: 92%;
`;

const Links = styled.a`
    cursor: pointer !important;
    margin: 0px 10px;
    color: black;
`;

const Separator = styled.div`
    margin: 0px 5px;
`;

export {
    BreadcrumbContainer,
    Links,
    Separator
}