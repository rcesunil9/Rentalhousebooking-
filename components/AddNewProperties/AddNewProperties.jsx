import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { locationDropdownFormatter, propertyTypeDropdownFormatter, imagesFormatter } from "../../utilities/formatters";
import { 
  changePropertyDetails,
  addNewProperties,
  uploadNewPhoto,
  addNewImages,
  resetPropertyData,
  uploadNewFloorPhoto,
  addNewFloorImages,
  getPropertyData,
  updateCheckboxDetails,
  quickPropertyUpdate } from "../../actions/addNewPropertyActions";
import { noOfBedroomJson, furnishedJson, depositMonthJson, descriptionCheckboxes, securityCheckboxes, newHomeCheckbox } from "../../utilities/staticJson";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
import { getLocationDetails } from "../../actions/locationDetailsActions";
import { getPropertyType } from "../../actions/propertyTypesActions";
import { getCustomerDetails, resetCustomerData } from "../../actions/customerDetailsActions";
// core components
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
// import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import GridItem from "../shared/Reusable/Grid/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import CustomInput from "../shared/Reusable/CustomInput/CustomInput.js";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import AddPropertyImages from "./AddPropertyImages";
import AddFloorPlanImages from "./AddFloorPlanImages";
import Card from "../shared/Reusable/Card/Card.js";
import CardHeader from "../shared/Reusable/Card/CardHeader.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import {
    CardTitleWhite,
    Link,
    GridWrapper,
    Dropdown,
    ModalContainer,
    ModalButton,
    ErrorMessage,
    DatePicker,
    CheckboxContainer,
    CheckboxComponent,
    CheckboxLabel,
    Subtitle,
    CheckboxWrapper,
    Footer,
    TabContainer,
    TabPanelContainer,
    DropdownLabel,
    DescriptionLabel,
    FieldErrorMessage
} from "./style";

const customStyles = {
  content: {
      position: 'fixed',
      backgroundColor: 'white',
      top: '25%',
      left: '25%',
      right: '25%',
      bottom: '25%',
      zIndex: '999999999',
      border: '2px solid #00acc1',
      padding: '20px',
      outline: 'none'
  },
  overlay: {
    backgroundColor: 'rgba(238, 238, 238, 0.95)'
  }
}

const AddNewProperties = (props) => {
  const history = useHistory();
  const urlPropertyId = props.match.params.id;
  const { propertyData, checkboxDetails, isAdmin } = props;
  const dataAvailable = (Object.keys(props.customerData).length < 3);
  const [descriptionFlag, updateDescriptionFlag] = useState(false);
  const [checkBoxes, updateCheckBoxes] = useState(checkboxDetails);
  const [showErrors, updateErrorFields] = useState({ location: false, pType: false, noOfBedroom: false, furnished: false, bathrooms: false, depositMonth: false});
  const [successModal, updateSuccessModal] = useState(true);
  const [showPropertyModal, updatePropertyModal] = useState(false);
  const [showPropertyFloorModal, updatePropertyFloorModal] = useState(false);
  const [showPropertyFloorImagesModal, updatePropertyFloorImagesModal] = useState(false);
  const [switchTab, navigateToNextTab] = useState(0);
  const locationOptions = locationDropdownFormatter(props.locationData);
  const propertyTypeOptions = propertyTypeDropdownFormatter(props.propertyTypeData);
  const simpleValidator = useRef(new SimpleReactValidator());

  useEffect(() => {
    updateCheckBoxes(checkboxDetails);
  }, [checkboxDetails]);

  useEffect(() => {
      props.resetPropData();
      props.resetCustData();
      props.getCustomerData();
      props.getLocationData();
      props.getPropertyTypeData();
      setTimeout(() => {
        const dtToday = new Date();
        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        const year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        const maxDate = year + '-' + month + '-' + day;
        document.getElementById('availableDate').min = maxDate;
      }, 0);
      if (!!urlPropertyId) {
        props.getPropertyDetails(urlPropertyId);
      }
  }, []);

  const submitFormDetails = (event) => {
    event.preventDefault();
    let errors = showErrors;
    const location = (!!propertyData.location && propertyData.location.locationName) || '';
    const pType = (!!propertyData.ptype && propertyData.ptype.typeName) || '';
    const noOfBedroom = propertyData.noOfBedroom;
    const furnished = (!!propertyData.propertyDetails && propertyData.propertyDetails['furnishing']) || '';
    const bathrooms = propertyData.propertyDetails.bathrooms;
    const depositMonth = propertyData.propertyDetails.depositMonth;

    if (!location) {
      errors = { ...errors, location: true};
    }
    if (!pType) {
      errors = { ...errors, pType: true};
    }
    if (!noOfBedroom) {
      errors = { ...errors, noOfBedroom: true};
    }
    if (!furnished) {
      errors = { ...errors, furnished: true};
    }
    if (!bathrooms) {
      errors = { ...errors, bathrooms: true};
    }
    if (!depositMonth) {
      errors = { ...errors, depositMonth: true};
    }
    updateErrorFields(errors);

    if (simpleValidator.current.allValid() && !!location && !!pType && !!noOfBedroom && !!furnished && !!bathrooms && !!depositMonth) {
        props.updateData({ key: 'error', data: false });        
        navigateToNextTab(1);
    } else {
        simpleValidator.current.showMessages();
        props.updateData({ key: 'error', data: true });
    }
  }

  const saveFormDetails = (event) => {
    event.preventDefault();
    if (simpleValidator.current.allValid() && !!propertyData.propertyDetails && !!propertyData.propertyDetails['description']) {
      props.updateData({ key: 'error', data: false });
      const deposit = (parseInt(propertyData.propertyDetails.depositMonth) * parseInt(propertyData.rent))
      const propertyAge = (!!propertyData.propertyDetails && propertyData.propertyDetails['propertyAge']) || '2010-01-01';
      const payload = { ...checkBoxes, deposit, propertyAge };
      props.saveData(payload, urlPropertyId);
    } else {
        simpleValidator.current.showMessages();
        updateDescriptionFlag(true);
        props.updateData({ key: 'error', data: true });
    }
  }

  const savePropChanges = (flag) => {
    let keyName = '', value = '';
    switch(flag) {
      case 'Approved':
        keyName = 'status';
        value = 'NotApproved';
        break;
      case 'NotApproved':
        keyName = 'status';
        value = 'Approved';
        break;
      case false:
        keyName = 'premium';
        value = true;
        break;
      case true:
        keyName = 'premium';
        value = false;
        break;
    }
    props.updateData({ key: keyName, data: value });
    props.quickUpdate(value);
  }

  const saveSelectedData = (event, otherOptions, updatedKey) => {
    let data = '', filteredData = {};
    switch (updatedKey) {
      case 'locationName':
        data = 'location'
        updateErrorFields({ ...showErrors, location: false });
        filteredData = otherOptions.filter(content => {
          return content[updatedKey] === event;
        });
        break;
      case 'typeName':
        data = 'ptype';
        updateErrorFields({ ...showErrors, pType: false });
        filteredData = otherOptions.filter(content => {
          return content[updatedKey] === event;
        });
        break;
      case 'furnishing':
        data = 'furnishing';
        updateErrorFields({ ...showErrors, furnished: false });
        filteredData[0] = event;
        break;
      case 'bathrooms':
        data = 'bathrooms';
        updateErrorFields({ ...showErrors, bathrooms: false });
        filteredData[0] = event;
        break;
      case 'depositMonth':
        data = 'depositMonth';
        updateErrorFields({ ...showErrors, depositMonth: false });
        filteredData[0] = event;
        break;
      default:
        data = 'noOfBedroom';
        updateErrorFields({ ...showErrors, noOfBedroom: false });
        filteredData[0] = event;
        break;
    }
    props.updateData({ key: data, data: filteredData[0] });
  }

  const updateValue = (event) => {
    const { name, value } = event.target;
    props.updateData({ key: name, data: value });
  }

  const closeModal = () => {
    updatePropertyModal(!showPropertyModal);
  }

  const closeFloorModal = () => {
    updatePropertyFloorModal(!showPropertyFloorModal);
  }

  const closeFloorImagesModal = () => {
    updatePropertyFloorImagesModal(!showPropertyFloorImagesModal)
  }

  const navigateProfilePage = () => {
    history.push("/profile");
  }

  const navigateHomePage = () => {
    updateSuccessModal(!successModal);
    history.push("/home");
  }

  const addPropImage = () => {
    updateSuccessModal(!successModal);
    closeModal();
  }

  const addPropFloorImage = () => {
    closeFloorModal();
    closeFloorImagesModal();
  }

  const savePropImages = () => {
    const photos = imagesFormatter(props.propertyImages);
    props.addPropertyImages(photos);
    closeModal();
    !urlPropertyId && closeFloorModal();
  }

  const saveFloorImages = () => {
    const images = imagesFormatter(props.propertyFloorImages);
    props.addPropertyFloorImages(images);
    !urlPropertyId && closeFloorImagesModal();
  }

  const updateBoxes = (event) => {
    const { name, value } = event.target;
    const checkboxValues = { ...checkBoxes, [name]: (value === "false") };
    props.updatePropertyCheckbox(checkboxValues);
    updateCheckBoxes(checkboxValues);
  }

  const updatePropImage = (images) => {
    props.uploadPicture(images);
  }

  const updatePropFloorImage = (images) => {
    props.uploadFloorPicture(images);
  }

  const getCheckboxdetails = (checkBoxElements) => {
    return checkBoxElements.map((checkboxContent, index) => {
      return (
        <GridItem xs={12} sm={12} md={12} key={ index + checkboxContent.name }>
            <CheckboxComponent
              type="checkbox"
              id={checkboxContent.name}
              name={checkboxContent.name}
              value={ checkBoxes[checkboxContent.name] }
              checked={ checkBoxes[checkboxContent.name] }
              onClick={(event) => updateBoxes(event)}
            />
            <CheckboxLabel htmlFor={checkboxContent.name}>
              {checkboxContent.label}
            </CheckboxLabel>
        </GridItem>
      )
    });
  }

  const handleChange = (event, newValue) => {
    if(newValue) {
      submitFormDetails(event);
    } else {
      navigateToNextTab(newValue);
    }
  };

  return (
    <GridWrapper>
    <GridContainer>
      <GridItem xs={12} sm={12} md={11} style={{ margin: '0 auto' }}>
            <Card>
              <CardHeader color="primary">
                  <CardTitleWhite>
                    Add Properties
                  </CardTitleWhite>
              </CardHeader>
              <CardBody>
                <ToastMessage />
                { !urlPropertyId ? 
                <ModalContainer isOpen={ dataAvailable } style={ customStyles }>
                    <ErrorMessage>{ 'Profile details are not available' }</ErrorMessage>
                    <ErrorMessage>{ 'Please enter those details first' }</ErrorMessage>
                    <ModalButton color="primary" onClick={ navigateProfilePage }>OK</ModalButton>
                </ModalContainer> : "" }
                {props.isFetched && successModal && !urlPropertyId ?
                <ModalContainer isOpen={ successModal } style={ customStyles }>
                    <ErrorMessage>{ `Property ID - ` + props.propertyId }</ErrorMessage>
                    <ErrorMessage>{ 'Property details saved successfully' }</ErrorMessage>
                    <ErrorMessage>{ `Do you want to add property images` }</ErrorMessage>
                    <ModalButton color="primary" onClick={ addPropImage } style={{ left: '15%' }}>Yes</ModalButton>
                    <ModalButton color="primary" onClick={ navigateHomePage }>No</ModalButton>
                </ModalContainer> : "" }
                { showPropertyModal ?
                  <AddPropertyImages
                    propertyImages={ props.propertyImages }
                    showPropertyModal={ showPropertyModal }
                    closeModal={ closeModal }
                    propId={ props.propertyId }
                    saveImages={ updatePropImage }
                    addPropPictures={ savePropImages }
                  />
                  : '' }
                {showPropertyFloorModal ?
                <ModalContainer isOpen={ showPropertyFloorModal } style={ customStyles }>
                    <ErrorMessage>{ `Property ID - ` + props.propertyId }</ErrorMessage>
                    <ErrorMessage>{ `Do you want to ${!!urlPropertyId ? 'update' : 'add' } floor plan to property` }</ErrorMessage>
                    <ModalButton color="primary" onClick={ addPropFloorImage } style={{ left: '15%' }}>Yes</ModalButton>
                    <ModalButton color="primary" onClick={ closeFloorModal }>No</ModalButton>
                </ModalContainer> : "" }
                { showPropertyFloorImagesModal ?
                  <AddFloorPlanImages
                    propertyFloorImages={ props.propertyFloorImages }
                    showPropertyFloorModal={ showPropertyFloorImagesModal }
                    closeFloorImagesModal={ closeFloorImagesModal }
                    propId={ props.propertyId }
                    saveImages={ updatePropFloorImage }
                    addPropPictures={ saveFloorImages }
                  />
                  : '' }
                <div className='row'>
                  <TabContainer>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={switchTab}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor="primary"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#00acc1"
                                }
                            }}>
                              <Tab label="Property" />
                              <Tab label="Facilities" disabled={(switchTab === 0)}/>
                        </Tabs>
                    </AppBar>
                    {(switchTab === 0) ?
                    <TabPanelContainer value={switchTab} index={0}>
                      <>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <Dropdown
                                options={ locationOptions }
                                search
                                placeholder=" "
                                value={ (!!propertyData.location && propertyData.location.locationName) || '' }
                                onChange={(event) => saveSelectedData(event, locationOptions, 'locationName') }
                            />
                            {showErrors.location ?
                              <FieldErrorMessage>The location field is required</FieldErrorMessage>
                            : ''}
                            <DropdownLabel flag={(!!propertyData.location && propertyData.location.locationName) || ''}>Location</DropdownLabel>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <Dropdown
                              options={ propertyTypeOptions }
                              placeholder=" "
                              value={ (!!propertyData.ptype && propertyData.ptype.typeName) || '' }
                              onChange={(event) => saveSelectedData(event, propertyTypeOptions, 'typeName') }
                          />
                          {showErrors.pType ?
                            <FieldErrorMessage>The property type field is required.</FieldErrorMessage>
                            : ''}
                            <DropdownLabel flag={(!!propertyData.ptype && propertyData.ptype.typeName) || ''}>Property Type</DropdownLabel>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <Dropdown
                              options={ noOfBedroomJson }
                              placeholder=" "
                              value={ propertyData.noOfBedroom }
                              onChange={(event) => saveSelectedData(event, [], 'noOfBedroom') }
                          />
                          {showErrors.noOfBedroom ?
                            <FieldErrorMessage>The no of bedrooms field is required.</FieldErrorMessage>
                            : ''}
                            <DropdownLabel flag={propertyData.noOfBedroom}>No of Bedrooms</DropdownLabel>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Rent amount"
                              id="rent"
                              name="rent"
                              value={ propertyData.rent || '' }
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('rent', propertyData.rent, 'required|integer')}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <Dropdown
                              options={ noOfBedroomJson }
                              placeholder=" "
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['bathrooms']) || ''}
                              onChange={(event) => saveSelectedData(event, [], 'bathrooms') }
                          />
                          {showErrors.bathrooms ?
                            <FieldErrorMessage>The no of bathroom field is required.</FieldErrorMessage>
                            : ''}
                          <DropdownLabel flag={(!!propertyData.propertyDetails && propertyData.propertyDetails['bathrooms']) || ''}>No of Bathroom</DropdownLabel>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <Dropdown
                              options={ depositMonthJson }
                              placeholder=" "
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['depositMonth']) || ''}
                              onChange={(event) => saveSelectedData(event, [], 'depositMonth') }
                          />
                          {showErrors.depositMonth ?
                            <FieldErrorMessage>Deposit Month field is required.</FieldErrorMessage>
                            : ''}
                            <DropdownLabel flag={(!!propertyData.propertyDetails && propertyData.propertyDetails['depositMonth']) || ''}>Deposit Month</DropdownLabel>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <DatePicker
                              labelText="Available Date"
                              id="availableDate"
                              name="availableDate"
                              type="date"
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['availableDate']) || ''}
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('availableDate', (!!propertyData.propertyDetails && propertyData.propertyDetails['availableDate']), 'required')}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Deposit"
                              id="deposit"
                              name="deposit"
                              disabled
                              value={ (parseInt(propertyData.propertyDetails.depositMonth) * parseInt(propertyData.rent)) || "" }
                              formControlProps={{
                                fullWidth: true
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Property Address"
                              id="address"
                              name="address"
                              value={ propertyData.address || ''}
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('address', propertyData.address, 'required')}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="House No"
                              id="houseno"
                              name="houseno"
                              value={ propertyData.houseno || '' }
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('houseno', propertyData.houseno, 'required')}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Post Code"
                              id="postcode"
                              name="postcode"
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['postcode']) || ''}
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('postcode', (!!propertyData.propertyDetails && propertyData.propertyDetails['postcode']), 'required|integer')}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Floor"
                              id="floor"
                              name="floor"
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['floor']) || ''}
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('floor', (!!propertyData.propertyDetails && propertyData.propertyDetails['floor']), 'required|integer')}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Landmark"
                              id="landmark"
                              name="landmark"
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['landmark']) || ''}
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                              errorText={simpleValidator.current.message('landmark', (!!propertyData.propertyDetails && propertyData.propertyDetails['landmark']), 'required')}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <Dropdown
                                options={ furnishedJson }
                                placeholder=" "
                                value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['furnishing']) || ''}
                                onChange={(event) => saveSelectedData(event, [], 'furnishing') }
                            />
                            {showErrors.furnished ?
                              <FieldErrorMessage>Furnished field is required.</FieldErrorMessage>
                              : ''}
                            <DropdownLabel flag={(!!propertyData.propertyDetails && propertyData.propertyDetails['furnishing']) || ''}>Furnished</DropdownLabel>
                          </GridItem>
                        </GridContainer>
                      </>
                      <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <Footer>
                              <Button color="primary" onClick={(event) => submitFormDetails(event)}>Continue</Button>
                              { !!urlPropertyId && 
                              <>
                              { !!isAdmin ?
                                <>
                                  <Button color="primary" onClick={() => savePropChanges(propertyData.status)}>{propertyData.status === "Approved" ? "Not Approved" : "Approved"}</Button>
                                  <Button color="primary" onClick={() => savePropChanges(propertyData.propertyDetails.premium)}>{propertyData.propertyDetails.premium ? 'Not Premium' : 'Premium'}</Button>
                                </> : "" }
                                <Button color="primary" onClick={closeModal}>Picture</Button>
                                <Button color="primary" onClick={closeFloorImagesModal}>Floor Plan</Button>
                              </> }
                            </Footer>
                          </GridItem>
                      </GridContainer>
                    </TabPanelContainer> : "" }
                    {(switchTab === 1) ? 
                    <TabPanelContainer value={switchTab} index={1}>
                      <>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <DescriptionLabel>Description</DescriptionLabel>
                             <textarea
                                id="description"
                                name="description"
                                rows="10"
                                value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['description']) || ''}
                                onChange={(event) => updateValue(event)}
                              />
                              {(descriptionFlag && propertyData.propertyDetails && !propertyData.propertyDetails['description']) ?
                              <FieldErrorMessage>Description field is required.</FieldErrorMessage>
                              : ''}
                        </GridItem> 
                        <GridItem xs={12} sm={12} md={12}>
                          <CheckboxContainer>{ getCheckboxdetails(descriptionCheckboxes) }</CheckboxContainer>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Subtitle>Security</Subtitle>
                          <CheckboxContainer>{ getCheckboxdetails(securityCheckboxes) }</CheckboxContainer>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                          <Subtitle isSpecial>Home</Subtitle>
                          <GridItem xs={12} sm={12} md={6}>
                            <DatePicker
                              labelText="Property Age"
                              id="propertyAge"
                              name="propertyAge"
                              type="date"
                              value={ (!!propertyData.propertyDetails && propertyData.propertyDetails['propertyAge']) || '2010-01-01'}
                              formControlProps={{
                                fullWidth: true
                              }}
                              onChange={(event) => updateValue(event)}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                          <CheckboxWrapper>
                          <CheckboxContainer>{ getCheckboxdetails(newHomeCheckbox) }</CheckboxContainer>
                          </CheckboxWrapper>
                          </GridItem>
                      </GridContainer>
                    </>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Footer>
                          <Button color="primary" onClick={(event) => saveFormDetails(event)}>Save</Button>
                          { !!urlPropertyId && 
                            <>
                              <Button color="primary" onClick={closeModal}>Picture</Button>
                              <Button color="primary" onClick={closeFloorImagesModal}>Floor Plan</Button>
                            </> }
                          <Button color="info" onClick={() => history.push("/home")}>Cancel</Button>
                        </Footer>
                      </GridItem>
                    </GridContainer>
                    </TabPanelContainer> : "" }
                  </TabContainer>
                </div>
              </CardBody>
            </Card>
      </GridItem>
    </GridContainer>
  </GridWrapper>
)
}

const mapDispatchToProps = dispatch => ({
  getLocationData: () => getLocationDetails(dispatch),
  getPropertyTypeData: () => getPropertyType(dispatch),
  updateData: (newValue) => changePropertyDetails(dispatch, newValue),
  saveData: (checkboxData, urlPropertyId) => addNewProperties(dispatch, checkboxData, urlPropertyId),
  quickUpdate: (dataChanged) => quickPropertyUpdate(dispatch, dataChanged),
  uploadPicture: (newValue) => uploadNewPhoto(dispatch, newValue),
  uploadFloorPicture: (newValue) => uploadNewFloorPhoto(dispatch, newValue),
  addPropertyImages: (images) => addNewImages(dispatch, images),
  addPropertyFloorImages: (images) => addNewFloorImages(dispatch, images),
  getCustomerData: () => getCustomerDetails(dispatch),
  resetPropData: () => resetPropertyData(dispatch),
  resetCustData: () => resetCustomerData(dispatch),
  getPropertyDetails: (propId) => getPropertyData(dispatch, propId),
  updatePropertyCheckbox: (checkboxData) => updateCheckboxDetails(dispatch, checkboxData),
});

const mapStateToProps = state => ({
  isLoading: state.errorReducer.isLoading,
  locationData: state.locationDetailsReducer.locationData,
  propertyTypeData: state.propertyTypeReducer.propertyTypeData,
  propertyData: state.addPropertyReducer.propertyData,
  propertyImages: state.addPropertyReducer.photo,
  propertyFloorImages: state.addPropertyReducer.floorPhoto,
  isFetched: state.addPropertyReducer.isFetched,
  propertyId: state.addPropertyReducer.propertyId,
  customerData: state.customerDetailsReducer.customerData,
  checkboxDetails: state.addPropertyReducer.checkboxData,
  currentStatus: state.propertyDetailsReducer.status,
  isAdmin: state.loginDetailsReducer.isAdmin
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProperties);
