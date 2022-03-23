import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import GridItem from "../shared/Reusable/Grid/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import Card from "../shared/Reusable/Card/Card.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import { Carousel } from "react-responsive-carousel";
import Button from "../shared/Reusable/CustomButtons/Button.js";
import MapContainer from "../shared/Reusable/Maps/maps";
import PropertyImage from "../../assets/img/default.jpeg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";

//For Tab
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import RoomIcon from "@material-ui/icons/Room";
import BuildIcon from "@material-ui/icons/Build";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RenderPropertyImagesFullView from "../shared/Reusable/Modal/modal";
import {
  PropertyDetail,
  PropertyItem,
  PropertyData,
  PropertyFeatures,
  PropertyPrice,
  PropertyAdd,
  OwnerData,
  ViewOnMap,
  OwnerDetails,
  MainContainer,
  SideContainer,
} from "./style";
import {
  getPropertyDetails,
  getPremiumPropertyDetails,
} from "../../actions/propertyDetailsActions";
import { getCustomerDetails } from "../../actions/customerDetailsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
}));

const TabsForDetailedInfo = (tabsProps) => {
  const propertyDetails = tabsProps.propertyData.propertyDetails;
  const classes = useStyles();

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const FeaturesView = () => {
    const { propertyData } = tabsProps;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h6>Available from:</h6> {propertyDetails.availableDate}
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h6>Landmark:</h6> {propertyDetails.landmark}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <h6>No of Bathrooms:</h6> {propertyData.bathrooms}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Furnishing:</h6> {propertyDetails.furnishing}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Floor no:</h6> {propertyDetails.floor}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <p>
              <h6>Description:</h6> {propertyDetails.description}
            </p>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Garden:</h6> {propertyDetails.garden ? "Yes" : "No"}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Lift:</h6> {propertyDetails.lift ? "Yes" : "No"}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>New Property:</h6> {propertyDetails.newHome ? "Yes" : "No"}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Parking:</h6> {propertyDetails.parking ? "Yes" : "No"}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Drinking water available:</h6>{" "}
            {propertyDetails.drinkingWater ? "Yes" : "No"}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Boaring available:</h6> {propertyDetails.boaring ? "Yes" : "No"}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Security Guard:</h6>{" "}
            {propertyDetails.securityGuard ? "Yes" : "No"}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Security Camera:</h6>{" "}
            {propertyDetails.securityCamera ? "Yes" : "No"}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h6>Garden:</h6> {propertyDetails.garden ? "Yes" : "No"}
          </GridItem>
        </GridContainer>
      </>
    );
  };

  const getFloorPlanImages = (photos) => {
    const propertyImages = photos.map((data, key) => {
      const photoImage = !!data.photo ? data.photo : PropertyImage;
      return (
        <div key={data.id + key} className={"carousel-images"}>
          <img src={photoImage} alt="Floor plan" />
          <div
            style={{ background: "white", padding: "33px", fontSize: "14px" }}
          >
            {data.floorplanDesc}
          </div>
        </div>
      );
    });
    return propertyImages;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabsProps.value}
          onChange={tabsProps.handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#00acc1",
            },
          }}
          aria-label="In-depth details about the property"
        >
          <Tab
            label="Property Details"
            icon={<HomeWorkIcon />}
            {...a11yProps(0)}
          />
          <Tab label="Maps" icon={<RoomIcon />} {...a11yProps(1)} />
          <Tab label="Floor Plan" icon={<BuildIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabsProps.value} index={0}>
        <PropertyFeatures>
          <div>
            <FeaturesView />
          </div>
        </PropertyFeatures>
      </TabPanel>
      <TabPanel value={tabsProps.value} index={1}>
        <MapContainer
          {...{
            lat: tabsProps.propertyData.location.latitude.split("°")[0],
            lng: tabsProps.propertyData.location.longitude.split("°")[0],
          }}
        />
      </TabPanel>
      <TabPanel value={tabsProps.value} index={2}>
        {tabsProps.propertyData.floorplans &&
          tabsProps.propertyData.floorplans.length > 0 && (
            <PropertyItem>
              <Carousel>
                {getFloorPlanImages(tabsProps.propertyData.floorplans)}
              </Carousel>
            </PropertyItem>
          )}
        {tabsProps.propertyData.floorplans.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "30px" }}>
            No Floor plan images added yet!
          </h5>
        )}
      </TabPanel>
    </div>
  );
};

const PropertyDetailPage = (props) => {
  const history = useHistory();
  const [contactOwner, setContactOwner] = React.useState(false);
  const [openImageFullView, setImageFullView] = React.useState(-1);
  const propertyId = props.match.params.id;

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.getCustomerData();
    props.getPropertyDetails(propertyId);
    props.getPremiumPropertyDetails();
  }, [propertyId]);

  useEffect(() => {
    if (!!props.premiumData && props.premiumData.id === parseInt(propertyId)) {
      props.getPremiumPropertyDetails();
    }
  }, [props.premiumData]);

  const imageClick = (key) => {
    setImageFullView(key);
  };

  const getPropertyImages = () => {
    const { photos } = props.propertyData;
    let propertyImages;
    if (photos.length > 0) {
      propertyImages = photos.map((data, key) => {
        return (
          <div
            key={data.id + key}
            className={"carousel-images"}
            onClick={() => imageClick(key)}
          >
            <img src={data.photo} />
          </div>
        );
      });
    } else {
      propertyImages = (
        <div className={"carousel-images"}>
          <img src={PropertyImage} />
        </div>
      );
    }
    return propertyImages;
  };

  const navigationToPremium = (id) => {
    history.push(`/property-details/${id}`);
  };

  const getHotPropertyImages = () => {
    const { id, photos } = props.premiumData;
    let propertyImages;
    if (photos.length > 0) {
      propertyImages = photos.map((data, key) => {
        return (
          <div
            key={data.id + key}
            className={"carousel-images"}
            onClick={() => navigationToPremium(id)}
          >
            <img src={data.photo} />
          </div>
        );
      });
    } else {
      propertyImages = (
        <div
          className={"carousel-images"}
          onClick={() => navigationToPremium(id)}
        >
          <img src={PropertyImage} />
        </div>
      );
    }
    return propertyImages;
  };

  const navigateBackPage = (event) => {
    event.stopPropagation();
    event.preventDefault();
    window.history.back();
  };

  return props.propertyData && props.propertyData.id == propertyId ? (
    <div key={propertyId}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={11} style={{ margin: "0 auto" }}>
          <Card>
            <CardBody>
              <PropertyDetail>
                <div className="row">
                  <MainContainer className="col-md-7">
                    <a
                      onClick={(event) => navigateBackPage(event)}
                      href="javascript:void(0)"
                    >
                      <KeyboardBackspaceIcon /> Back to Search
                    </a>
                    <PropertyItem>
                      <Carousel>{getPropertyImages()}</Carousel>
                    </PropertyItem>
                    <div className="tabs">
                      <TabsForDetailedInfo
                        {...{
                          propertyData: props.propertyData,
                          handleChange: handleChange,
                          value: value,
                        }}
                      />
                    </div>
                  </MainContainer>
                  <SideContainer className="col-md-5">
                    <PropertyData>
                      <h5>
                        {props.propertyData.location.locationName +
                          " - (Property Type : " +
                          props.propertyData.ptype.typeDesc +
                          ")"}
                      </h5>
                      <h6>{props.propertyData.location.locationDesc}</h6>
                      <div className="review">
                        <div className="location">
                          <LocationOnIcon />
                          <p>
                            {props.propertyData.location.locationName},{" "}
                            {props.propertyData.location.city},{" "}
                            {props.propertyData.location.country}
                          </p>
                          <ViewOnMap
                            className="ml-1 d-block d-md-inline"
                            onClick={() => {
                              if (value !== 1) {
                                setValue(1);
                              }
                              document
                                .getElementById("detail-tabs")
                                .scrollIntoView(true);
                            }}
                          >
                            {" "}
                            View on map
                          </ViewOnMap>
                        </div>
                      </div>
                      <div className="Price">
                        <h5>
                          Rent -{" "}
                          <span
                            style={{ fontWeight: "bold" }}
                            className="small-text"
                          >
                            £{props.propertyData.rent}
                          </span>
                        </h5>
                        <h5>
                          Type -{" "}
                          <span
                            style={{ fontWeight: "bold" }}
                            className="small-text"
                          >
                            {props.propertyData.noOfBedroom} Bedroom{" "}
                          </span>
                        </h5>
                      </div>
                      <div className="Price">
                        <h5>
                          Deposit Amount - £
                          {props.propertyData.propertyDetails.deposit}
                        </h5>
                      </div>
                      <Button
                        color="primary"
                        onClick={() => setContactOwner(!contactOwner)}
                      >
                        Contact or Message Owner
                      </Button>
                      <OwnerDetails contactowner={contactOwner}>
                        <CardBody>
                          <OwnerData>
                            {
                              <p>
                                {" "}
                                <PersonIcon />
                                {props.propertyData.customer.firstname}{" "}
                                {props.propertyData.customer.lastname}
                              </p>
                            }
                            {
                              <a
                                href={
                                  "tel:" + props.propertyData.customer.mobile
                                }
                              >
                                <PhoneIcon />
                                {props.propertyData.customer.mobile}
                              </a>
                            }
                            {
                              <a
                                href={
                                  "mailto:" +
                                  props.propertyData.customer.user.username
                                }
                              >
                                <MailIcon />
                                {props.propertyData.customer.user.username}
                              </a>
                            }
                          </OwnerData>
                        </CardBody>
                      </OwnerDetails>
                      {!!props.premiumData ? (
                        <PropertyAdd>
                          <Carousel>{getHotPropertyImages()}</Carousel>
                          <div>
                            <PropertyPrice>
                              <span>Rent: {`£${props.premiumData.rent}`}</span>
                            </PropertyPrice>
                          </div>
                        </PropertyAdd>
                      ) : (
                        ""
                      )}
                    </PropertyData>
                    {openImageFullView > -1 && (
                      <RenderPropertyImagesFullView
                        {...{
                          getPropertyImages: getPropertyImages,
                          photos: props.propertyData.photos,
                          propertyData: props.propertyData,
                          idx: openImageFullView,
                          onFullViewClose: () => setImageFullView(-1),
                        }}
                      />
                    )}
                  </SideContainer>
                </div>
              </PropertyDetail>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => ({
  propertyData: state.propertyDetailsReducer.getPropertyDetails,
  isLoading: state.errorReducer.isLoading,
  premiumData: state.propertyDetailsReducer.getPremiumPropertyDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerData: () => getCustomerDetails(dispatch),
  getPropertyDetails: (id) => getPropertyDetails(dispatch, id),
  getPremiumPropertyDetails: () => getPremiumPropertyDetails(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPage);
