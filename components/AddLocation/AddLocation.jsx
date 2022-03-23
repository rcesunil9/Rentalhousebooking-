import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import Loader from "../shared/Reusable/Loader/Loader";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
import { getLocationDetails, addNewLocation, updateLocation } from "../../actions/locationDetailsActions";
import { locationDropdownFormatter } from "../../utilities/formatters";
import { addLocationOptions } from "../../utilities/staticJson";
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
    Title,
    SearchLocation,
    Link,
    ContainerWrapper,
    GridWrapper,
    CardTitleWhite,
    Dropdown
} from "./style";

const AddLocation = (props) => {
    const [ locationType, updateLocationType ] = useState('addNewLocation');
    const [ selectedData, updateSelectedData ] = useState({ location: {}, locationName: '', locationDesc: '', valid: true, latitude: '', longitude: '', city: '', state: '', country: '' });
    const locationOptions = locationDropdownFormatter(props.locationData);
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
      props.getLocationData();
    }, []);

    const saveSelectedData = (event, locationOptions) => {
      const filteredData = locationOptions.filter(content => {
        return content['locationName'] === event;
      });
      updateSelectedData({ 
        location: filteredData[0],
        locationName: filteredData[0].locationName,
        locationDesc: filteredData[0].locationDesc,
        latitude: filteredData[0].latitude,
        longitude: filteredData[0].longitude,
        city: filteredData[0].city,
        state: filteredData[0].state,
        country: filteredData[0].country 
      });
    }

    const updateValue = (event) => {
      const { name, value } = event.target;
      updateSelectedData({ ...selectedData, [name]: value });
    }

    const submitFormDetails = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            let locationDetails = {};
            const { locationName, locationDesc, location, latitude, longitude, city, state, country } = selectedData;
            if (locationType === 'addNewLocation') {
              locationDetails = { locationName, locationDesc, latitude, longitude, city, state, country };
              props.saveData(locationDetails);
            } else {
              locationDetails = { id: location['id'], locationName, locationDesc, latitude, longitude, city, state, country };
              props.updateCurrentLocation(locationDetails);
            }
        } else {
            simpleValidator.current.showMessages();
            updateSelectedData({ ...selectedData, valid: false });
        }
    }

    const updateType = (event) => {
      updateLocationType(event);
      updateSelectedData({ ...selectedData, locationName: '', locationDesc: '', valid: true });
    }

    return (
        <GridWrapper>
          <ContainerWrapper>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5} style={{ margin: '0 auto' }}>
                <Card>
                  <Loader isLoading={ props.isLoading } />
                  <ToastMessage />
                  <CardHeader color="primary">
                    <CardTitleWhite>Add Location</CardTitleWhite>
                  </CardHeader>
                  <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Title>Location :</Title>
                      <Dropdown 
                          options={ addLocationOptions } 
                          search
                          placeholder=""
                          value={ locationType }
                          onChange={(event) => updateType(event) } 
                      />
                    </GridItem>
                  </GridContainer>
                    { locationType === 'updateExistingLocation' ?
                      <p>
                          <SearchLocation>
                              <Dropdown 
                                  options={ locationOptions } 
                                  search
                                  placeholder="Select existing locations"
                                  value={ selectedData.locationName }
                                  onChange={(event) => saveSelectedData(event, locationOptions) } 
                              />
                          </SearchLocation>
                      </p> : '' }
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Location Name"
                          id="locationName"
                          name="locationName"
                          value={ selectedData.locationName }
                          formControlProps={{ fullWidth: true }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('locationName', selectedData.locationName, 'required')}
                        />
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Location Description"
                          id="locationDesc"
                          name="locationDesc"
                          value={ selectedData.locationDesc }
                          formControlProps={{ fullWidth: true }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('locationDesc', selectedData.locationDesc, 'required')}
                        />
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Latitude"
                          id="latitude"
                          name="latitude"
                          value={ selectedData.latitude }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('latitude', selectedData.latitude, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Longitude"
                          id="longitude"
                          name="longitude"
                          value={ selectedData.longitude }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('longitude', selectedData.longitude, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="City"
                          id="city"
                          name="city"
                          value={ selectedData.city }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('city', selectedData.city, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="State"
                          id="state"
                          name="state"
                          value={ selectedData.state }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('state', selectedData.state, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Country"
                          id="country"
                          name="country"
                          value={ selectedData.country }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('country', selectedData.country, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={(event) => submitFormDetails(event)}>
                      { locationType === 'updateExistingLocation' ? 'Update' : 'Submit'}
                    </Button>
                    <Link href="./home">Cancel</Link>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
        </ContainerWrapper>
      </GridWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
  getLocationData: () => getLocationDetails(dispatch),
  saveData: (updatedData) => addNewLocation(dispatch, updatedData),
  updateCurrentLocation: (updatedData) => updateLocation(dispatch, updatedData),
});

const mapStateToProps = state => ({
  isLoading: state.errorReducer.isLoading,
  locationData: state.locationDetailsReducer.locationData
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);