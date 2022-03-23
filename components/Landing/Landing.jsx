import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLandingPropertyDetails, getSearchedData } from "../../actions/propertyDetailsActions";
import { getLocationDetails } from "../../actions/locationDetailsActions";
import { getPropertyType } from "../../actions/propertyTypesActions";
import SearchBar from "../shared/SearchBar/SearchBar";
import {
    LandingContainer,
    Advertisement,
    AdvertisementBanner
} from "./style";

const Landing = (props) => {
    const history = useHistory();

    useEffect(() => {
        props.getPropertyDetails();
        props.getLocationData();
        props.getPropertyTypeData();
    }, []);

    const searchHandler = (searchData) => {
        // if (Object.keys(searchData).length > 0) {
        //     history.push(`/home?location=${searchData.location.locationName}`);
        // }
    }

    return (
        <LandingContainer>
            <div style={{ textAlign: 'center', overflow: 'auto', color: '#fff' }}>
                <h1 style={{ marginTop: '75px', fontWeight: 'bold' }}></h1>
            </div>
            <AdvertisementBanner>
                <h2>Easy Renting for Tenants and Landlords</h2>
            </AdvertisementBanner>
            <div style={{ height: '21.5vh' }}>
                <SearchBar
                    locationData={props.locationData}
                    propertyTypeData={props.propertyTypeData}
                    searchHandler={searchHandler}
                    approvedProperty={() => props.getPropertyDetails()}
                    hideAdvanced={true} />
            </div>
            <Advertisement>
                <h2>Advertisement</h2>
            </Advertisement>
        </LandingContainer>
    )
}

const mapStateToProps = state => ({
    propertyData: state.propertyDetailsReducer.getApprovedProperties,
    pageSize: state.propertyDetailsReducer.pageSize,
    pageNumber: state.propertyDetailsReducer.pageNumber,
    filteredProperties: state.propertyDetailsReducer.filteredProperties,
    locationData: state.locationDetailsReducer.locationData,
    propertyTypeData: state.propertyTypeReducer.propertyTypeData,
    isLoading: state.errorReducer.isLoading,
    errorText: state.errorReducer.error,
    authToken: state.loginDetailsReducer.token,
    isAdmin: state.loginDetailsReducer.isAdmin
});

const mapDispatchToProps = dispatch => ({
    getPropertyDetails: () => getLandingPropertyDetails(dispatch),
    getLocationData: () => getLocationDetails(dispatch),
    getPropertyTypeData: () => getPropertyType(dispatch),
    submitSearchData: (searchData) => getSearchedData(dispatch, searchData)
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);