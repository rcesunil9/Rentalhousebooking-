import styled from "styled-components";

const HeaderSection = styled.footer `
    width: 100%;
    background-color: #00acc1;
    height: 30vh;
    
    .contactus{
        color:black;
        padding-bottom:1rem;
        padding-top:1rem;
    }
    // .social-links{
    // padding-right:1rem;
    // }
    .contact-row{
        margin-top:1rem;
    }
  
  
   
  
`;

const RightSection = styled.div `
    text-align: right;
    margin-top: 10px;
    color: white;
    @media only screen and (max-width: 500px) {
        p{
            margin-right: 10px;
            padding: 0px;
            border: none;
        }
    }
`;
const HeaderContainer = styled.div`
    margin: 0px;
`;
const Container = styled.div `
    display: ${(props) => (props.isFlex ? 'inline-flex' : 'inline')};
    .logo{
        width:35px;
        height:35px;
        margin-top: 9px;
        align-items:center
    border-radius: 10px;
    }
`;

const RegisterLink = styled.a `
    border-right: 1px solid #f8f8f8;
    color: #fff;
    margin-right: 5px;
    padding-right: 10px;
    font-size: 15px;
    
    : hover {
        color: #fff;
        text-decoration: underline;
    }
`;

const LoginLink = styled.a `
    color: #fff;
    font-size: 15px;

    : hover {
        color: #fff;
        text-decoration: underline;
    }
`;

export {
    HeaderSection,
    RightSection,
    RegisterLink,
    LoginLink,
    Container,
    HeaderContainer
}