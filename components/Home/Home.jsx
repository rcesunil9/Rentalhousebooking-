import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "../shared/SearchBar/SearchBar";
import { resetUserToken } from "../../actions/loginActions";
import { getCustomerDetails } from "../../actions/customerDetailsActions";
import {
  getLandingPropertyDetails,
  getSearchedData,
  changePageNumber,
  getUnApprovedPropertyDetails,
  approveProperty,
  updateStatus,
} from "../../actions/propertyDetailsActions";
import { getLocationDetails } from "../../actions/locationDetailsActions";
import { getPropertyType } from "../../actions/propertyTypesActions";
import PropertyDetails from "../PropertyDetails/PropertyDetails";

const Home = (props) => {
  const history = useHistory();
  const isCustProp = props.currentStatus === "custProperty";
  const [currentState, updateCurrentState] = useState("");
  const [selectedLocation, updateLocation] = useState(null);

  useEffect(() => {
    if (!!history.location.search) {
      const urlData = history.location.search.split("?");
      const priceMin = urlData[4].split("=")[1];
      const priceMax = urlData[5].split("=")[1];
      const bedroomsMin = urlData[6].split("=")[1];
      const bedroomsMax = urlData[7].split("=")[1];
      let searchData = {
        location: {
          locationName: decodeURIComponent(urlData[1].split("=")[1]),
        },
        ptype: { typeName: urlData[3].split("=")[1] },
        id: urlData[2].split("=")[1],
      };
      if (!!priceMin || !!priceMax) {
        searchData.price = !!priceMin ? priceMin : priceMax;
      }
      if (!!priceMin && !!priceMax) {
        searchData.price = priceMin + "-" + priceMax;
      }
      if (!!bedroomsMin || !!bedroomsMax) {
        searchData.noOfBedrooms = !!bedroomsMin ? bedroomsMin : bedroomsMax;
      }
      if (!!bedroomsMin && !!bedroomsMax) {
        searchData.noOfBedrooms = bedroomsMin + "-" + bedroomsMax;
      }
      updateLocation(searchData);
      props.submitSearchData(searchData);
    } else {
      props.getHomePageData();
    }
    props.getLocationData();
    props.getPropertyTypeData();
    props.getCustomerData();
  }, []);

  const logout = () => {
    props.resetToken();
  };

  const searchHandler = (searchData) => {
    searchData = !!currentState
      ? { ...searchData, status: currentState }
      : searchData;
    props.submitSearchData(searchData);
  };

  const pageSelected = (currentPage) => {
    props.updatePageNumber(currentPage);
  };

  const approveProperties = (propertyContent) => {
    props.approveCurrentProperty(propertyContent);
    setTimeout(() => {
      props.getUnapprovedProperties();
    }, 2000);
  };

  const updatePropertyType = (propType) => {
    updateCurrentState(propType);
    !!propType ? props.getUnapprovedProperties() : props.getHomePageData();
  };

  const updatePropStatus = (status) => {
    props.changeStatus(status);
  };

  return (
    <>
      {!isCustProp ? (
        <SearchBar
          isAdmin={props.isAdmin}
          status={props.currentStatus}
          locationData={props.locationData}
          propertyTypeData={props.propertyTypeData}
          searchHandler={searchHandler}
          approvedProperty={() => props.getHomePageData()}
          unApprovedProperty={updatePropertyType}
          selectedLocation={selectedLocation}
          statusUpdater={updatePropStatus}
        />
      ) : (
        ""
      )}
      <PropertyDetails
        isAdmin={props.isAdmin}
        authToken={window.localStorage.getItem("tokenId")}
        propertyData={props.propertyData}
        updatedPage={pageSelected}
        pageNumber={props.pageNumber}
        pageSize={props.pageSize}
        filteredProperties={props.filteredProperties}
        approveProperties={approveProperties}
        isCustProp={isCustProp}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyData: state.propertyDetailsReducer.getApprovedProperties,
  pageSize: state.propertyDetailsReducer.pageSize,
  pageNumber: state.propertyDetailsReducer.pageNumber,
  filteredProperties: state.propertyDetailsReducer.filteredProperties,
  currentStatus: state.propertyDetailsReducer.status,
  locationData: state.locationDetailsReducer.locationData,
  fetchedCustomerDetails: state.customerDetailsReducer.isFetched,
  propertyTypeData: state.propertyTypeReducer.propertyTypeData,
  isLoading: state.errorReducer.isLoading,
  isAdmin: state.loginDetailsReducer.isAdmin,
  errorText: state.errorReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerData: () => getCustomerDetails(dispatch),
  getHomePageData: () => getLandingPropertyDetails(dispatch),
  resetToken: () => resetUserToken(dispatch),
  getLocationData: () => getLocationDetails(dispatch),
  getPropertyTypeData: () => getPropertyType(dispatch),
  submitSearchData: (searchData) => getSearchedData(dispatch, searchData),
  updatePageNumber: (pageNumber) => changePageNumber(dispatch, pageNumber),
  getUnapprovedProperties: (filteredData) =>
    getUnApprovedPropertyDetails(dispatch, filteredData),
  approveCurrentProperty: (propertyContent) =>
    approveProperty(dispatch, propertyContent),
  changeStatus: (status) => updateStatus(dispatch, status),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
