import React, { useState, useRef, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitLoginDetails } from "../../actions/loginActions";
import Loader from "../shared/Reusable/Loader/Loader";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
// core components
import GridItem from "../shared/Reusable/Grid/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import CustomInput from "../shared/Reusable/CustomInput/CustomInput.js";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import Card from "../shared/Reusable/Card/Card.js";
import CardHeader from "../shared/Reusable/Card/CardHeader.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import CardFooter from "../shared/Reusable/Card/CardFooter.js";
import {
    Link,
    GridWrapper,
    CardCategoryWhite,
    CardTitleWhite
 } from "./style";

const Login = (props) => {
    const [fieldData, updateFieldData] = useState({ email: '', password: '' , error: false});
    const history = useHistory();
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
        if(!!props.authToken) {
            history.push("/home");
        }
    }, [props.authToken]);

    const updateValue = (event) => {
        const { name, value } = event.target;
        updateFieldData({ ...fieldData, [name]: value });
    }

    const submitFormDetails = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            const userDetails = { username: fieldData.email, password: fieldData.password };
            props.loginDetails(userDetails);
        } else {
            simpleValidator.current.showMessages();
            updateFieldData({ ...fieldData, error: true });
        }
    }

    return (
        <GridWrapper>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5} style={{ margin: '0 auto' }}>
            <Card>
              <CardHeader color="primary">
                <ToastMessage />
                <Loader isLoading={ props.isLoading } />
                <CardTitleWhite>Login</CardTitleWhite>
                <CardCategoryWhite>Sign in to your account</CardCategoryWhite>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      name="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => updateValue(event)}
                      errorText={(simpleValidator.current.message('email', fieldData.email, 'required|email'))}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      name="password"
                      type="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => updateValue(event)}
                      errorText={simpleValidator.current.message('password', fieldData.password, 'required')}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={(event) => submitFormDetails(event)}>Login</Button>
                <Link href="./forgotPwd">Forgot Password</Link>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </GridWrapper>
    )
}

const mapStateToProps = state => ({
    authToken: state.loginDetailsReducer.token,
    isLoading: state.errorReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    loginDetails: (userDetails) => submitLoginDetails(dispatch, userDetails)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);