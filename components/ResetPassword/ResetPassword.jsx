import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import Loader from "../shared/Reusable/Loader/Loader";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
import { specialPasswordRegex } from "../../utilities/validations";
import { resetPasswordDetails } from "../../actions/resetPasswordActions";
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
    CardTitleWhite
 } from "./style";
 
const ResetPassword = (props) => {
    const [fieldData, updateFieldData] = useState({ email: '', password: '' , confirmPassword: '' , confirmPwdError: false, error: false, specialPasswordError: false });
    const history = useHistory();
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
      if (props.isReset) {
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    }, [props.isReset]);

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
            updateFieldData({ ...fieldData, confirmPwdError: false, specialPasswordError: false });
            const resetToken = this.props.match.params.id;
            const data = { password: fieldData.password, resetToken };
            props.resetDetails(data);
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
                <Loader isLoading={ props.isLoading } />
                <ToastMessage />
                <CardTitleWhite>Reset Password</CardTitleWhite>
              </CardHeader>
              <CardBody>
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
                      type="password"
                      name="confirmPassword"
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
                <Button color="primary" onClick={(event) => submitFormDetails(event)}>Change Password</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </GridWrapper>
    )
}

const mapStateToProps = state => ({
    isLoading: state.errorReducer.isLoading,
    isReset: state.resetPasswordDetailsReducer.isReset
});

const mapDispatchToProps = dispatch => ({
  resetDetails: (userDetails) => resetPasswordDetails(dispatch, userDetails)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);