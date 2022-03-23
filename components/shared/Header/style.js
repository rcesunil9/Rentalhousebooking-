import styled from "styled-components";
import SelectSearch from 'react-select-search';

const HeaderSection = styled.header `
    height: auto;
    border-top: ${(props) => (props.authToken ? '0.5px solid white' : 'none')};
    background-color: #00acc1;
`;

const Container = styled.div `
    display: ${(props) => (props.isFlex ? 'inline-flex' : 'inline')};
    .logo{
        width:45px;
        height:45px;
        margin-top: 2px;
        align-items:center;
        border-radius: 5px;
        margin-bottom: 2px;
    }
`;

const RightSection = styled.div `
    text-align: right;
    margin-top: 15px;
    margin-bottom: 10px;

    @media only screen and (max-width: 500px) {
        a{
            margin-right: 10px;
            padding: 0px;
            border: none;
        }
    }
`;

const ProfileIcon = styled.a`
    color: #fff;
    padding-right: 20px;
    font-size: 15px;
    border-radius: 20px;
    cursor: pointer;

    span {
        margin-right: 5px;
    }
    
    : hover {
        color: #fff;
        text-decoration: none;
    }
`;

const RegisterLink = styled.a `
    color: #fff;
    padding: 5px 20px;
    margin-right: 20px;
    font-size: 15px;
    border: 1px solid white;
    border-radius: 20px;
    cursor: pointer;
    
    : hover {
        color: #fff;
        text-decoration: none;
    }
`;

const GeneralLink = styled.a `
    color: #fff;
    margin: 5px 15px;
    font-size: 15px;
    cursor: pointer;    

    : hover {
        color: #fff;
        text-decoration: underline;
    }
`;

const Separator = styled.span `
    margin: 6px 0px;
    color: #fff;
`;

const Wrapper = styled.div `
    width: 92%;
    padding: 0px;
`;

const Dropdown = styled(SelectSearch) `
    width: 19%;

    input {
        padding: 0;
        border: 1px solid transparent;
        line-height: 30px;
        background: #00ACC1;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
        outline: none;

        : hover {
            outline: none;
            border: 1px solid transparent;
        }
    }

    div {
        margin-left: 16px;

         > ul {
            list-style: none;
            position: absolute;
            z-index: 99999;
            background: #fff;
            padding: 5px;
            box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.15);

                button {
                    background: #fff;
                    display: block;
                    height: 36px;
                    width: 100%;
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

const UserIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
    background-color: white;
    border-radius: 10px;
`;

const HeaderContainer = styled.div`
    margin: 0px;
`;

export {
    HeaderSection,
    Container,
    RightSection,
    ProfileIcon,
    RegisterLink,
    GeneralLink,
    Separator,
    Dropdown,
    Wrapper,
    UserIcon,
    HeaderContainer
}