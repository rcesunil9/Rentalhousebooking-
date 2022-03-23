import styled from "styled-components";

const LandingContainer = styled.div`
    background: url(${require('../../assets/img/landing.jpeg')}) no-repeat center center fixed;
    background-size: cover;
    min-height: 84vh;
`;

const Advertisement = styled.div`
    background-color: rgba(221,221,221,0.8);
    margin: 0 auto;
    width: 80%;
    border-radius: 25px;

    h2 {
        padding: 50px 50px;
        text-align: center;
    }
`;

const AdvertisementBanner = styled.div`
    background-color: rgba(221,221,221,0.8);
    margin: 0 auto;
    width: 70%;
    border-radius: 25px;

    h2 {
        padding: 15px 0px;
        text-align: center;
    }
`;


export {
    LandingContainer,
    Advertisement,
    AdvertisementBanner
}