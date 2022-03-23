import React from "react";
import { useHistory } from "react-router-dom";
import { manageDropdown, adminDropdown, customerDropdown } from "../../../utilities/staticJson";
import Usericon from "../../../assets/img/user.png"
import logo from "../../../assets/img/logobg.png"
import sdf from "../../About/About"
import { 
    HeaderSection,
    Container,
    RightSection,
    RegisterLink,
    GeneralLink,
    Separator,
    Dropdown,
    Wrapper,
    ProfileIcon,
    HeaderContainer
} from "./style";

const Header = (props) => {
    const history = useHistory();
    const authToken = window.localStorage.getItem("tokenId");

    const updateApprovalValue = (selectedValue) => {
        switch(selectedValue) {
            case "Not Approved":
                history.push("/home");
                setTimeout(() => {
                    props.statusUpdater("NotApproved");
                    props.unApprovedProperty('NotApproved');
                }, 2000);
                break;
            case "approved":
                history.push("/home");
                setTimeout(() => {
                    props.statusUpdater("Approved");
                    props.approvedProperty();
                }, 2000);
                break;
            case "myProperties":
                history.push("/home");
                props.statusUpdater("custProperty");
                props.getCustProp();
                break;
            case "addProperty":
                history.push("/addNewProperties");
                break;
            case "addLocation":
                history.push("/addLocation");
                break;
            case "addPropertyType":
                history.push("/addPropertyType");
                break;
            case "toRent":
                props.statusUpdater("Approved");
                props.getHomePageData();
                history.push("/");
                break;
            case "aboutUs":
                history.push("/");
                break;
            default:
                break;
        }
    }

    const resetToken = () => {
        props.userLogout();
        history.push("/");
    }

    return (
        <>
        <HeaderSection>  
            <HeaderContainer className="row">
                <div className="col-md-12">
                <Container>
                    <div className="row">
                    <div className="col-md-6 col-sm-12 pull-left">
                            <img src={logo} alt="logo" className="logo"/>
                        </div>
                        <div className="col-md-6 col-sm-12 pull-right">
                            <RightSection>
                            { !!authToken ? 
                                    <>
                                        <RegisterLink href="/home">Home</RegisterLink>
                                        <ProfileIcon href="/profile">
                                            <span className="glyphicon glyphicon-user" />
                                            {props.username}
                                        </ProfileIcon>
                                        <RegisterLink href="/About">About</RegisterLink>
                                        <RegisterLink onClick={resetToken}>Logout</RegisterLink>
                                    </> :
                                    <>
                                        <RegisterLink href="/register">Register</RegisterLink>
                                        <RegisterLink href="/login">Login</RegisterLink>
                                    </> 
                            }
                            </RightSection>
                        </div>
                    </div>
                </Container>
                </div>
            </HeaderContainer>
        </HeaderSection >
        { !!authToken ?
            <HeaderSection authToken>  
                <Wrapper className="container">
                    <Container isFlex>
                        <GeneralLink onClick={ () => updateApprovalValue('toRent') }>To Rent</GeneralLink>
                        <Separator>|</Separator>
                        { !!props.isAdmin ?
                        <>
                            <Dropdown 
                                options={ manageDropdown } 
                                value="Manage"
                                placeholder="Manage"
                                renderValue={(valueProps) => <input {...valueProps} value="Manage" />}                            
                                onChange={(event) => updateApprovalValue(event) } 
                            />
                            <Separator>|</Separator>
                            <Dropdown 
                                options={ adminDropdown } 
                                value="Administrator"
                                placeholder="Administrator"
                                renderValue={(valueProps) => <input {...valueProps} value="Administrator" />}                            
                                onChange={(event) => updateApprovalValue(event) } 
                            />
                        </> :
                            <Dropdown 
                                options={ customerDropdown } 
                                value="Manage"
                                placeholder="Manage"
                                renderValue={(valueProps) => <input {...valueProps} value="Manage" />}                            
                                onChange={(event) => updateApprovalValue(event) } 
                            />
                        }
                    </Container>
                </Wrapper>
            </HeaderSection>
            : "" }
        </>
    )
}

export default Header;