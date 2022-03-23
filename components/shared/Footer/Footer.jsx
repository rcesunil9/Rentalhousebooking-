import React from "react";
import { HeaderSection, RightSection, Container,
    HeaderContainer
 } from "./style";

const Footer = () => {
  return (
    <HeaderSection className="col-md-12">
      <div className="contact-row col-md-6 col-sm-12 pull-left">
        <div className="contactus">
          <a className="contactus" href="/Contact">
            Contact Us
          </a>
          <br />
        </div>
        <div className="contactus">
          <a className="contactus" href="https://www.w3schools.com">
            Help
          </a>
          <br />
        </div>
        <div className="contactus">
          <a className="contactus" href="https://www.w3schools.com">
            Terms and Conditions
          </a>
        </div>
      
      </div>
      <HeaderSection>  
            <HeaderContainer className="row">
                <div className="col-md-12">
                <Container>
                    <div className="row">
                    <div className="col-md-6 col-sm-12 pull-left">
                    <img
              src="https://img.icons8.com/ios-glyphs/30/000000/facebook.png"
              alt="facebook"
              className="logo"
            />
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/twitter.png"
              alt="twitter"
              className=" logo"
            />
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png"
              alt="linkedin"
              className="logo"
            />
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/youtube.png"
              alt="youtube"
              className="logo"
            />
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/instagram.png"
              alt="instagram"
              className="logo"
            />
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/pinterest.png"
              alt="pinterest"
              className="logo"
            />                        </div>
                        <div className="col-md-6 col-sm-12 pull-right">
                            <RightSection>
                       
                                 
                                    <>
            <p>© 2020 Jyotish Solutions Limited. All rights
            reserved.</p>
                                    </> 
                            
                            </RightSection>
                        </div>
                    </div>
                </Container>
                </div>
            </HeaderContainer>
        </HeaderSection >
    </HeaderSection>
  );
};

export default Footer;