import React, { useState, useRef } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { connect } from "react-redux";
import Loader from "../shared/Reusable/Loader/Loader";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
import { submitPwdDetails } from "../../actions/forgotPwdActions";
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

const ForgotPassword = (props) => {
    const [fieldData, updateFieldData] = useState({ email: '', error: false });
    const simpleValidator = useRef(new SimpleReactValidator());

    const updateValue = (event) => {
        const { name, value } = event.target;
        updateFieldData({ ...fieldData, [name]: value });
    }

    const submitFormDetails = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            props.userDetail(fieldData.email);
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
                <CardTitleWhite>Forgot Password</CardTitleWhite>
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
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={(event) => submitFormDetails(event)}>Reset Password</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </GridWrapper>
    )
}

const mapStateToProps = state => ({
    isLoading: state.errorReducer.isLoading,
    isUpdated: state.forgotPwdReducer.isUpdated
});

const mapDispatchToProps = dispatch => ({
    userDetail: (userDetails) => submitPwdDetails(dispatch, userDetails)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
