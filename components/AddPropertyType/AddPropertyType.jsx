import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import Loader from "../shared/Reusable/Loader/Loader";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
import { getPropertyType, addNewPropertyType, updateProperty } from "../../actions/propertyTypesActions";
import { propertyTypeDropdownFormatter } from "../../utilities/formatters";
import { addPropertyTypeOptions } from "../../utilities/staticJson";
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
    SearchPropertyType,
    Link,
    ContainerWrapper,
    GridWrapper,
    CardTitleWhite,
    Dropdown
} from "./style";

const AddPropertyType = (props) => {
    const [ propertyType, updatePropertyType ] = useState('');
    const [ selectedData, updateSelectedData ] = useState({ property: {}, typeName: '', typeDesc: '', valid: true });
    const propertyTypeOptions = propertyTypeDropdownFormatter(props.propertyTypeData);
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
      props.getPropertyData();
    }, []);

    const saveSelectedData = (event, propertyTypeOptions) => {
      const filteredData = propertyTypeOptions.filter(content => {
        return content['typeName'] === event;
      });
      updateSelectedData({ property: filteredData[0], typeName: filteredData[0].typeName, typeDesc: filteredData[0].typeDesc });
    }

    const updateValue = (event) => {
      const { name, value } = event.target;
      updateSelectedData({ ...selectedData, [name]: value });
    }

    const submitFormDetails = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            let propertyDetails = {};
            const { typeName, typeDesc, property } = selectedData;
            if (propertyType === 'addNewPropertyType') {
              propertyDetails = { typeName, typeDesc };
              props.saveData(propertyDetails);
            } else {
              propertyDetails = { id: property['id'], typeName, typeDesc };
              props.updateCurrentPropertyType(propertyDetails);
            }
        } else {
            simpleValidator.current.showMessages();
            updateSelectedData({ ...selectedData, valid: false });
        }
    }

    const updateType = (event) => {
      updatePropertyType(event);
      updateSelectedData({ ...selectedData, typeName: '', typeDesc: '', valid: true });
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
                    <CardTitleWhite>Add Property Type</CardTitleWhite>
                  </CardHeader>
                  <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Title>Property Type :</Title>
                      <Dropdown 
                          options={ addPropertyTypeOptions } 
                          search
                          placeholder=""
                          value={ propertyType }
                          onChange={(event) => updateType(event) } 
                      />
                    </GridItem>
                  </GridContainer>
                    { propertyType === 'updateExistingPropertyType' ?
                      <p>
                          <SearchPropertyType>
                              <Dropdown 
                                  options={ propertyTypeOptions } 
                                  search
                                  placeholder="Select existing property type"
                                  value={ selectedData.typeName }
                                  onChange={(event) => saveSelectedData(event, propertyTypeOptions) } 
                              />
                          </SearchPropertyType>
                      </p> : '' }
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Property Type Name"
                          id="typeName"
                          name="typeName"
                          value={ selectedData.typeName }
                          formControlProps={{ fullWidth: true }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('typeName', selectedData.typeName, 'required')}
                        />
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Property Type Description"
                          id="typeDesc"
                          name="typeDesc"
                          value={ selectedData.typeDesc }
                          formControlProps={{ fullWidth: true }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('typeDesc', selectedData.typeDesc, 'required')}
                        />
                      </GridItem>
                  </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={(event) => submitFormDetails(event)}>
                      { propertyType === 'updateExistingPropertyType' ? 'Update' : 'Submit'}
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
  getPropertyData: () => getPropertyType(dispatch),
  saveData: (updatedData) => addNewPropertyType(dispatch, updatedData),
  updateCurrentPropertyType: (updatedData) => updateProperty(dispatch, updatedData),
});

const mapStateToProps = state => ({
  isLoading: state.errorReducer.isLoading,
  propertyTypeData: state.propertyTypeReducer.propertyTypeData
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyType);