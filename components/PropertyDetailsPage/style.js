import styled from "styled-components";
import Card from "../shared/Reusable/Card/Card.js";

const CardTitleWhite = styled.h4`
  color: #ffffff;
  margin-top: 0px;
  min-height: auto;
  font-weight: 300;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  margin-bottom: 3px;
  text-decoration: none;
  a {
    font-size: 16px;
    color: white;
    font-weight: bold;
  }
`;
const PropertyDetail = styled.div`
  .carousel .carousel .thumbs-wrapper {
    display: none;
  }
  .carousel-img {
    margin-bottom: 15px;
  }
  .tabs {
    margin-top: 25px;
  }
  .tabs .MuiBox-root {
    padding: 5px 15px;
    min-height: 223px;
  }
  .tabs .MuiTab-labelIcon {
    min-height: 40px;
  }

  div[role="tabpanel"] {
    overflow-y: overlay;
    border: 1px solid rgb(0 0 0 / 7%);
    height: 45vh;
  }
`;
const PropertyItem = styled.article`
  margin-top: 16px;
  position: relative;
  transition: all 0.5s;

  img {
    width: 100%;
    height: 100%;
  }

  .thumbs-wrapper {
    display: none;
  }
`;
const CarouselItem = styled.div`
  img {
    width: 100%;
  }
`;
const PropertyData = styled.div`
  top: 1%;
  right: 0px;
  z-index: 9999999;
  height: 350px;

  .review {
    font-size: 14px;
  }
  .location {
    display: flex;
    align-items: center;
  }
  .location p {
    margin: 0px;
  }
  .location a {
    font-size: 12px;
    margin-left: 5px;
    color: #00acc1;
  }
  .price span {
    font-size: 14px;
    color: #ddd;
  }
`;
const PropertyFeatures = styled.div`
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  div {
    font-size: 16px;
  }
  h6 {
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
  }
`;
const PropertyAdd = styled.article`
  margin-top: 25px;
  position: sticky;
  top: 1%;
  right: 0px;

  img {
    width: 100%;
    height: 100%;
  }

  .thumbs-wrapper {
    display: none;
  }
`;
const PropertyDescription = styled.span`
  display: inline;
  float: left;
  width: 100%;
  padding: 10px;
`;
const PropertyPrice = styled.span`
  float: left;
  font-size: 16px;
  padding: 5px;
  font-weight: 500;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
const OwnerData = styled.div`
  p {
    margin: 0px;
    margin-bottom: 3px;
  }
  *,
  a {
    font-size: 14px;
    margin-bottom: 3px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: normal;
    display: flex;
    align-itesm: center;
  }
  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;
const ViewOnMap = styled.p`
  text-decoration: underline;
  cursor: pointer;
  margin-left: 6px !important;
  color: blueviolet;
`;

const OwnerDetails = styled(Card)`
  visibility: ${(props) => (!!props.contactowner ? "visible" : "hidden")};
  margin: 5px 0px !important;
`;

const MainContainer = styled.div`
  a {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    display: flex;
    cursor: pointer;
    align-items: center;
  }
  a svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

const SideContainer = styled.div`
  @media (min-width: 991px) {
    position: absolute;
  }
  right: 0px;
  top: 5%;
  z-index: 1;
`;

export {
  CardTitleWhite,
  CarouselItem,
  PropertyDetail,
  PropertyItem,
  PropertyData,
  PropertyFeatures,
  PropertyAdd,
  PropertyDescription,
  PropertyPrice,
  OwnerData,
  OwnerDetails,
  ViewOnMap,
  MainContainer,
  SideContainer,
};
