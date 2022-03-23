import React from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropertyImage from "../../assets/img/default.jpeg";
import { Link } from "react-router-dom";
// core components
import GridItem from "../shared/Reusable/Grid/GridItem.js";
import GridContainer from "../shared/Reusable/Grid/GridContainer.js";
import Card from "../shared/Reusable/Card/Card.js";
import CardHeader from "../shared/Reusable/Card/CardHeader.js";
import CardBody from "../shared/Reusable/Card/CardBody.js";
import {
  PropertyItem,
  PropertyTag,
  PropertyItemContent,
  PropertyInfo,
  PropertyInfoDetails,
  PropertyDescription,
  PropertyDetailSection,
  PropertyPrice,
  PaginationButton,
  PaginationWrapper,
  CardTitleWhite,
  NoPropertyWidget,
  Advertisement,
} from "./style";

const PropertyDetails = (props) => {
  const history = useHistory();
  const {
    authToken,
    pageNumber,
    pageSize,
    propertyData,
    filteredProperties,
    isAdmin,
    isCustProp,
  } = props;
  const propertyObject =
    filteredProperties.length > 0 ? filteredProperties : propertyData;

  const approveProperty = (propertyContent) => {
    props.approveProperties(propertyContent);
  };

  const getPropertyImages = (photos, id) => {
    const propertyImages = photos.map((data, key) => {
      const photoImage = !!data.photo ? data.photo : PropertyImage;
      return (
        <div
          key={data.id + key}
          onClick={() => history.push(`/property-details/${id}`)}
        >
          <img src={photoImage} />
        </div>
      );
    });
    return propertyImages;
  };

  const getPropertyWidget = () => {
    const { propertyData, filteredProperties } = props;
    const propertyObject =
      filteredProperties.length > 0 ? filteredProperties : propertyData;
    if (propertyObject.length === 0) {
      return (
        <NoPropertyWidget className="col-md-12 col-sm-12">
          <h5>No Properties Available</h5>
        </NoPropertyWidget>
      );
    }
    return propertyObject.map((propContent, index) => {
      console.log(propContent);
      return (
        <div key={index + propContent.id} className="row">
          <PropertyItem>
            <Link
              className="row col-md-5 col-sm-12"
              style={{ marginRight: "5px" }}
            >
              {propContent.photos.length === 0 ? (
                <img
                  src={PropertyImage}
                  alt="img"
                  onClick={() =>
                    history.push(`/property-details/${propContent.id}`)
                  }
                />
              ) : (
                <Carousel>
                  {getPropertyImages(propContent.photos, propContent.id)}
                </Carousel>
              )}
            </Link>
            <PropertyTag hotProperty={propContent.propertyDetails.premium}>
              {propContent.propertyDetails.premium ? "Premium" : "General"}
            </PropertyTag>
            <PropertyItemContent className="row col-md-7 col-sm-12">
              <PropertyInfo>
                <PropertyInfoDetails className="col-md-5 col-sm-12">
                  Location: {propContent.location.locationName}
                </PropertyInfoDetails>
                <PropertyInfoDetails className="col-md-7 col-sm-12">
                  Property Type: {propContent.ptype.typeDesc}
                </PropertyInfoDetails>
              </PropertyInfo>
              <PropertyDescription>
                <div className="col-md-5">
                  <h5>No of Bedroom: {propContent.noOfBedroom}</h5>
                  {!!propContent.customer ? (
                    <>
                      <h5>Contact Details:</h5>
                      <h5>
                        <span>{propContent.customer.firstname}</span>
                        <span> {propContent.customer.lastname}</span>
                      </h5>
                      <h5>{propContent.customer.mobile}</h5>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-5">
                  <h5>
                    Available Date: {propContent.propertyDetails.availableDate}
                  </h5>
                  <h5>Furnishing: {propContent.propertyDetails.furnishing}</h5>
                  {!!authToken ? <h5>Property ID: {propContent.id}</h5> : ""}
                </div>
              </PropertyDescription>
              <PropertyDetailSection>
                <PropertyPrice>
                  <div
                    className="col-md-4 col-sm-12"
                    style={{ marginTop: "10px" }}
                  >
                    <b>Rent: £{propContent.rent}</b>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    {propContent.status === "NotApproved" && !!isAdmin ? (
                      <PaginationButton
                        type="submit"
                        value="Approve Property"
                        onClick={() => approveProperty(propContent)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-4 col-sm-12">
                    {!!isAdmin || !!isCustProp ? (
                      <PaginationButton
                        editProperty
                        type="submit"
                        value="Edit Property"
                        onClick={() =>
                          history.push(`/editProperty/${propContent.id}`)
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </PropertyPrice>
              </PropertyDetailSection>
            </PropertyItemContent>
          </PropertyItem>
        </div>
      );
    });
  };

  const pageChanged = (currentPage) => {
    props.updatedPage(currentPage);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={11} style={{ margin: "0 auto" }}>
          <Card>
            <CardHeader color="primary">
              <CardTitleWhite>
                {!!authToken ? "Properties" : "Hot Properties"}
              </CardTitleWhite>
            </CardHeader>
            <CardBody className="row">
              <div className="col-md-9 col-sm-12">
                {getPropertyWidget()}
                <div className="row">
                  {propertyObject.length > 0 ? (
                    <PaginationWrapper className="col-md-12 col-sm-12">
                      <Pagination
                        activePage={pageNumber}
                        itemsCountPerPage={pageSize}
                        pageRangeDisplayed={5}
                        totalItemsCount={props.propertyData.length}
                        onChange={pageChanged}
                      />
                    </PaginationWrapper>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Advertisement className="col-md-3 col-sm-12">
                Advertisement
              </Advertisement>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default PropertyDetails;
