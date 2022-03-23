/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
// import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { submitLoginDetails } from "../../actions/loginActions";
// core components
//import GridItem from "../About/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import CustomInput from "../shared/Reusable/CustomInput/CustomInput.js";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import endUrls from '../../utilities/endpoints';

import CardContent from "@material-ui/core/CardContent"; 
import Card from "../shared/Reusable/Card/Card.js";
import CardHeader from "../shared/Reusable/Card/CardHeader.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import { GridItem, GridWrapper, AboutWrapper, CardTitleWhite, ContainerWrapper,CardCategoryWhite } from "./style";
import { connect } from "react-redux";
import { addFeedback } from "../../actions/propertyTypesActions.js";
import { DescriptionLabel, FieldErrorMessage } from "../AddNewProperties/style.js";
const About = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [descriptionFlag, updateDescriptionFlag] = useState(false);

  const [fieldData, updateFieldData] = useState({ name: "",comments:"", error: false });
  const updateValue = (event) => {
    const { name, value } = event.target;
    updateFieldData({ ...fieldData, [name]: value });
  };

  const submitFormDetails = (event) => {
    event.preventDefault();
    if (simpleValidator.current.allValid()) {
      const userDetails = {
        name: fieldData.name,
        comments: fieldData.comments,
        email:fieldData.email,
        status:"OPEN"
      };
      props.saveData(userDetails);
      console.log(props)


    } else {
      simpleValidator.current.showMessages();
      updateFieldData({ ...fieldData, error: true });
      updateDescriptionFlag(true);

    }
  }


  return (
    <AboutWrapper>

      <ContainerWrapper>
        <GridContainer >
          <GridItem className="divabout">
          <Card className="div-about">
              <CardHeader color="primary">
                <CardTitleWhite>About Us</CardTitleWhite>
              </CardHeader>
              <CardBody  >
                <h4>XXY. We Know what a home is really worth!</h4>

                <p>Hello, We're XXXY. A property website and app</p>

                <p>
                  We know you are not looking for just a place to live. You are
                  looking for a home
                </p>

                <p>
                  Yeah, we have got over a million properties for you to browse.
                </p>

                <p>
                  Tools, that help you filter them in all kinds of creative ways
                </p>

                <p>
                  And reliable house price estimates, so you can be sure you aren't
                  paying over the odds
                </p>

                <p>But, we know you are looking for more than that.</p>

                <p>We know, what a home is really worht</p>

                <p>So let us help you find yours</p>
            </CardBody>
            </Card>
          </GridItem>
          
          <GridItem style={{margin: 5, borderLeft:"1px solid #00acc1"}} className="divcontact">
          <Card className="div-feedback">
            <CardHeader color="primary">
              <CardTitleWhite>Feedback</CardTitleWhite>
            </CardHeader>
            <CardBody >
            <h6>Please find the feedback on our website</h6>
            <CustomInput
              labelText="Enter Your Name" 
              id="name"
              name="name"
              formControlProps={{
                fullWidth: true,
              }}
              onChange={(event) => updateValue(event)}
              errorText={simpleValidator.current.message(
                "name",
                fieldData.name,
                "required|name"
              )}
            />

            <CustomInput
              labelText="Enter Your Email"
              id="email"
              name="email"
              formControlProps={{
                fullWidth: true,
              }}
              onChange={(event) => updateValue(event)}
              errorText={simpleValidator.current.message(
                "email",
                fieldData.email,
                "required|email"
              )}
            />
            {/* <CustomInput
              labelText="Enter Your Comments Here"
              id="comments"
              name="comments"
              formControlProps={{
                fullWidth: true,
              }}
              onChange={(event) => updateValue(event)}
              errorText={simpleValidator.current.message(
                "comments",
                fieldData.comments,
                "required|comments"
              )}
            /> */}
            <div className="comments">
   <DescriptionLabel>Comments</DescriptionLabel>
                             <textarea
                                id="comments"
                                name="comments"
                                rows="10"
                                value={ (fieldData.comments || '')}
                                onChange={(event) => updateValue(event)}
              // errorText={simpleValidator.current.message(
              //   "comments",
              //   fieldData.comments,
              //   "required|comments"
              // )}

                              />
                              {( descriptionFlag && fieldData.comments.length === 0 ) ?
                              <FieldErrorMessage>Comments field is required.</FieldErrorMessage> 
                              : ''}

                              </div> 
                              
            <Button onClick={(event) => submitFormDetails(event)}>
              Submit
            </Button>
            </CardBody>
            </Card>

          </GridItem>
          
          
        </GridContainer>
      </ContainerWrapper>
    </AboutWrapper>
        
  );
};
const mapDispatchToProps = dispatch => ({
  saveData: (updatedData) => addFeedback(dispatch, updatedData),
});
const mapStateToProps = state => ({
  // isLoading: state.errorReducer.isLoading,
  // propertyTypeData: state.propertyTypeReducer.propertyTypeData
});
export default connect(mapStateToProps,mapDispatchToProps)(About);
