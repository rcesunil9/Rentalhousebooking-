/* eslint-disable */
import React, { useRef, useEffect,useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { connect } from "react-redux";

// core components
//import GridItem from "../shared/Reusable/Grid/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import CustomInput from "../shared/Reusable/CustomInput/CustomInput.js";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import { addContact } from "../../actions/propertyTypesActions.js";

import CardContent from '@material-ui/core/CardContent';
import Card from "../shared/Reusable/Card/Card.js";
import CardHeader from "../shared/Reusable/Card/CardHeader.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import {AboutWrapper, GridItem, CardTitleWhite, ContainerWrapper} from './style'
import { getCustomerDetails, changeCustomerDetails, updateCustomerData } from "../../actions/customerDetailsActions";
import { DescriptionLabel, FieldErrorMessage } from "../AddNewProperties/style.js";

const Contact = (props) => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [desc, setdesc] = useState("");
    const [descriptionFlag, updateDescriptionFlag] = useState(false);

    const updateValue= (event) => {
      const { name, value } = event.target;
      props.updateData({ key: name, data: value });
  }
    const updatedesc = (event) => {
        const  value  = event.target.value;
        setdesc(value);
    }
    useEffect(() => {
        props.getCustomerData();
    }, []);
    const submitFormDetails = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            props.updateData({ key: 'error', data: false });
            const userDetails = {
              name: props.customerData.name,
              number:props.customerData.mobile,
              email:props.customerData.email,
              propertyId:props.customerData.propertyId,
              description:desc,
              status:"OPEN"
            };
            props.saveData(userDetails);
        } else {
            simpleValidator.current.showMessages();
            props.updateData({ key: 'error', data: true });
            updateDescriptionFlag(true);
        }
    }
    console.log(props,desc,"props")
    return (
        <AboutWrapper >
            <ContainerWrapper >
                <GridContainer  >
                <GridItem className="divabout">
                 <Card className="div-about">
                    <CardHeader color="primary">
                      <CardTitleWhite>Contact Us</CardTitleWhite>
                    </CardHeader> 
                    <CardBody className="card-div">
                    <div className="sections">
<CustomInput
                          labelText="Name"
                          id="name"
                          name="name"
                          value={props.customerData.name }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('name', props.customerData.name, 'required')}
                          style={{fullWidth: true}}
                        />
              
            
</div>
<div className="sections">
<CustomInput
                          labelText="Phone Number"
                          id="mobile"
                          name="mobile"
                          value={ props.customerData.mobile || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('mobile', props.customerData.mobile, 'required|phone')}
                        />
</div>
<div className="sections">
<CustomInput
                          labelText="Email address"
                          id="email"
                          name="email"
                         
                          value={props.customerData.email }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={(simpleValidator.current.message('email', (props.customerData.email), 'required|email'))}
                        />
</div>

<div className="sections">
<CustomInput
                          labelText="Property Id"
                          id="propertyId"
                          name="propertyId"
                          value={ props.customerData.propertyId || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('propertyId', props.customerData.propertyId, 'required')}
                        />
</div>

   <div>
   <DescriptionLabel>Description</DescriptionLabel>
                             <textarea
                                id="description"
                                name="description"
                                rows="10"
                                value={ (desc || '')}
                                onChange={(event) => updatedesc(event)}
                                // errorText={simpleValidator.current.message('description', desc, 'required')}

                              />
                              {( descriptionFlag && desc.length === 0 ) ?
                              <FieldErrorMessage>Description field is required.</FieldErrorMessage> 
                              : ''}

<Button onClick={(event) => submitFormDetails(event)}>Submit</Button>
                              </div>   
<div>

<br/>

</div>


                    </CardBody>
                  </Card>
                  </GridItem>

                  <GridItem style={{margin: 5, borderLeft:"1px solid #00acc1"}} className="divcontact">
                  <Card className="div-feedback">
                    <CardHeader color="primary">
                      <CardTitleWhite>Head Office</CardTitleWhite>
                    </CardHeader> 
                    <CardBody >
                     <div className="sections">                       
                      <h4>LocalGhar Group Ltd</h4>
                      </div>
                        <h6>4307 George Street</h6>
                        <p className="feedbackp">Hyderabad</p>
                        <p className="feedbackp">500035</p>
                        <p className="feedbackp">Telangana</p>
                    </CardBody>
                  </Card>
                  </GridItem>
                            
            </GridContainer> 
            </ContainerWrapper>
        </AboutWrapper>
    )
}
const mapDispatchToProps = dispatch => ({
    getCustomerData: () => getCustomerDetails(dispatch),
    updateData: (newValue) => changeCustomerDetails(dispatch, newValue),
    // saveData: () => updateCustomerData(dispatch),
    saveData: (updatedData) => addContact(dispatch, updatedData),
  });
  
  const mapStateToProps = state => ({
    customerData: state.customerDetailsReducer.customerData,
    isLoading: state.errorReducer.isLoading
  });
export default connect(mapStateToProps, mapDispatchToProps)(Contact)