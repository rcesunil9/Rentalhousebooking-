import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import Loader from "../shared/Reusable/Loader/Loader";
import ToastMessage from "../shared/Reusable/ToastMessage/ToastMessage";
import { getCustomerDetails, changeCustomerDetails, updateCustomerData } from "../../actions/customerDetailsActions";
// core components
import GridItem from "../shared/Reusable/Grid/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import CustomInput from "../shared/Reusable/CustomInput/CustomInput.js";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import Card from "../shared/Reusable/Card/Card.js";
import CardHeader from "../shared/Reusable/Card/CardHeader.js";
import CardAvatar from "../shared/Reusable/Card/CardAvatar.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import CardFooter from "../shared/Reusable/Card/CardFooter.js";
import {
    Link,
    ContainerWrapper,
    GridWrapper,
    CardCategoryWhite,
    CardTitleWhite,
    ProfilePicUploader,
    GenderRadio,
    GenderLabel
} from "./style";
import ProfileImage from "../../assets/img/profile.jpg";
import RadioIcon from './RadioIcon';

const Profile = (props) => {
    const dataAvailable = (Object.keys(props.customerData).length > 0);
    const simpleValidator = useRef(new SimpleReactValidator());

    useEffect(() => {
      props.getCustomerData();
  }, []);

    const updateValue = (event) => {
        const { name, value } = event.target;
        props.updateData({ key: name, data: value });
    }

    const updateGender = (genderSelected) => {
      props.updateData({ key: 'gender', data: genderSelected });
    }

    const onDrop = (picture) => {
      const file = picture[0];
      if(!!file) {
        const reader = new FileReader();
        reader.onloadend = function() {
          props.updateData({ key: 'photo', data: reader.result });
        }
        reader.readAsDataURL(file);
      }
    }

    const submitFormDetails = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            props.updateData({ key: 'error', data: false });
            props.saveData();
        } else {
            simpleValidator.current.showMessages();
            props.updateData({ key: 'error', data: true });
        }
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
                    <CardTitleWhite>Profile</CardTitleWhite>
                    <CardCategoryWhite>Complete your profile</CardCategoryWhite>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Email address"
                          id="username"
                          name="username"
                          disabled
                          value={ (!!props.customerData.user && props.customerData.user['username']) || ''}
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={(simpleValidator.current.message('username', (!!props.customerData.user && props.customerData.user['username']), 'required|email'))}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="First Name"
                          id="firstname"
                          name="firstname"
                          value={ props.customerData.firstname || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('firstname', props.customerData.firstname, 'required')}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CardAvatar profile>
                            <a href="#pablo">
                            <img src={ props.customerData.photo || ProfileImage } alt="..." />
                            </a>
                        </CardAvatar>
                        <ProfilePicUploader
                            singleImage={true}
                            buttonText='Choose profile pic'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={3145728}
                            fileSizeError="Profile pic cannot be greater than 3MB"
                            fileTypeError="Please upload JPG and PNG format images"
                          />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Last Name"
                          id="lastname"
                          name="lastname"
                          value={ props.customerData.lastname || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('lastname', props.customerData.lastname, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer style={{ padding: '20px 0px 0px' }}>
                      <GridItem xs={12} sm={12} md={10}>
                        <GenderLabel>Gender: </GenderLabel>
                        <GenderRadio
                          checked={ props.customerData.gender === "male" }
                          onChange={() => updateGender("male")}
                          value="male"
                          name="Male"
                          label="Male"
                          icon={<RadioIcon />}
                          checkedIcon={<RadioIcon checked={ props.customerData.gender === "male"} />}
                        />
                        <GenderLabel>Male</GenderLabel>
                        <GenderRadio
                          checked={ props.customerData.gender === "female" }
                          onChange={() => updateGender("female")}
                          value="female"
                          name="Female"
                          label="Female"
                          icon={<RadioIcon />}
                          checkedIcon={<RadioIcon checked={ props.customerData.gender === "female"} />}
                        />
                        <GenderLabel>Female</GenderLabel>
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Date of birth"
                          id="birth_date"
                          name="birth_date"
                          type="date"
                          value={ props.customerData.birth_date || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('birth_date', props.customerData.birth_date, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
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
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Address"
                          id="address"
                          name="address"
                          value={ props.customerData.address || ''}
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('address', props.customerData.address, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Postal Code"
                          id="postcode"
                          name="postcode"
                          value={ props.customerData.postcode || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('postcode', props.customerData.postcode, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="City"
                          id="city"
                          name="city"
                          value={ props.customerData.city || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('city', props.customerData.city, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={10}>
                        <CustomInput
                          labelText="Country"
                          id="country"
                          name="country"
                          value={ props.customerData.country || '' }
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event) => updateValue(event)}
                          errorText={simpleValidator.current.message('country', props.customerData.country, 'required')}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    { dataAvailable ? 
                    <Button color="primary" onClick={(event) => submitFormDetails(event)}>Update</Button> :
                    <Button color="primary" onClick={(event) => submitFormDetails(event)}>Submit</Button> }
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
  getCustomerData: () => getCustomerDetails(dispatch),
  updateData: (newValue) => changeCustomerDetails(dispatch, newValue),
  saveData: () => updateCustomerData(dispatch),
});

const mapStateToProps = state => ({
  customerData: state.customerDetailsReducer.customerData,
  isLoading: state.errorReducer.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);