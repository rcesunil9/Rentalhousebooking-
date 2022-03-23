import React, { useState, useRef, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { specialPasswordRegex } from "../../utilities/validations";
import { submitRegistrationDetails } from "../../actions/registrationActions";
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
    GridWrapper,
    CardCategoryWhite,
    CardTitleWhite
 } from "./style";

const Register = (props) => {
    const [fieldData, updateFieldData] = useState({ username: '', password: '' , confirmPassword: '' , specialPasswordError: false, confirmPwdError: false, error: false });
    const history = useHistory();
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
      if (props.registeredSuccess) {
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    }, [props.registeredSuccess]);

    const updateValue = (event) => {
        const { name, value } = event.target;
        updateFieldData({ ...fieldData, [name]: value });
    }

    const submitFormDetails = (event) => {
        event.preventDefault();
        if (!!fieldData.password && !specialPasswordRegex.test(fieldData.password)) {
            updateFieldData({ ...fieldData, specialPasswordError: true, confirmPwdError: false });
        } else if (fieldData.password !== fieldData.confirmPassword) {
            updateFieldData({ ...fieldData, confirmPwdError: true, specialPasswordError: false });
        } else if (simpleValidator.current.allValid()) {
            const userDetails = { username: fieldData.email, password: fieldData.password };
            updateFieldData({ ...fieldData, confirmPwdError: false, specialPasswordError: false });
            props.registerDetails(userDetails);
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
                <CardTitleWhite>Registration</CardTitleWhite>
                <CardCategoryWhite>Create your account</CardCategoryWhite>
              </CardHeader>
              <ToastMessage />
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
                      errorText={
                            fieldData.specialPasswordError ? 'Password should contain  minimum 8 digit with one capital letter, one number and one special character' :
                          (simpleValidator.current.message('password', fieldData.password, 'required'))
                        }
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => updateValue(event)}
                      errorText={
                            fieldData.confirmPwdError ? 'Password and Confirm Password should be same.' :
                          (simpleValidator.current.message('confirmPassword', fieldData.confirmPassword, 'required'))
                        }
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={(event) => submitFormDetails(event)}>Create Account</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </GridWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    registerDetails: (userDetails) => submitRegistrationDetails(dispatch, userDetails)
});

export default connect(undefined, mapDispatchToProps)(Register);