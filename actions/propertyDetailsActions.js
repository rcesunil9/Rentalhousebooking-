import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { showLoadingIcon, showErrorMessage, hideLoadingIcon } from './errorActions';
import {
    SUCCESS_APPROVED_PROPERTIES, UPDATE_PAGE_NUMBER, SUCCESS_UNAPPROVED_PROPERTY,
    PROPERTY_DETAILS, PREMIUM_PROPERTY, STATUS_UPDATER
} from '../utilities/actionTypes';
import { store } from '../index';

let headers = {
    'Content-Type': 'application/json'
};

const updatePropertyDetails = (payload) => ({
    type: SUCCESS_APPROVED_PROPERTIES,
    payload
});

const unapprovedPropertyDetails = (payload) => ({
    type: SUCCESS_UNAPPROVED_PROPERTY,
    payload
});

const updatePageNumber = (payload) => ({
    type: UPDATE_PAGE_NUMBER,
    payload
});

const updateDetailsOfAProperty = (payload) => ({
    type: PROPERTY_DETAILS,
    payload
});

const updateDetailsOfPremiumProperty = (payload) => ({
    type: PREMIUM_PROPERTY,
    payload
});

export const changePageNumber = (dispatch, pageNumber) => {
    dispatch(updatePageNumber(pageNumber));
}

export const updateStatus = (dispatch, payload) => {
    dispatch({ type: STATUS_UPDATER, payload});
}

export const getLandingPropertyDetails = async (dispatch) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = store.getState().loginDetailsReducer.token;
        headers = { ...headers, "Authorization": "Bearer " + authToken };
        const response = await axios.get(endUrls.getApprovedProperties, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updatePropertyDetails(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the property details. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to load the property details. Try again after some time"));
    }
}
export const getUnApprovedPropertyDetails = async (dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = { ...headers, "Authorization": "Bearer " + authToken };
        payload = { "status": "NotApproved" };
        const response = await axios.post(endUrls.unApprovedProperties, payload, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(unapprovedPropertyDetails(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the unapproved property details. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to load the unapproved property details. Try again after some time"));
    }
}

export const getSearchedData = async (dispatch, searchedData) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = store.getState().loginDetailsReducer.token;
        headers = { ...headers, "Authorization": "Bearer " + authToken };
        const response = await axios.post(endUrls.searchProperties, searchedData, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updatePropertyDetails(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the property details. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to load the property details. Try again after some time"));
    }
};

export const approveProperty = async (dispatch, propertyContent) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = { ...headers, "Authorization": "Bearer " + authToken };
        const payload = { ...propertyContent, status: 'Approved' };
        const response = await axios.post(endUrls.approveNewProperties, payload, { headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Property Approved"));
        } else {
            dispatch(showErrorMessage("Failed to approve the property. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to approve the property. Try again after some time"));
    }
};

export const getCustomerProperties = async (dispatch, customerId) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = { ...headers, "Authorization": "Bearer " + authToken };
        const url = endUrls.getCustomerProperty + customerId;
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updatePropertyDetails(response.data));
        } else {
            dispatch(showErrorMessage("Failed to get customer properties. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to get customer properties. Try again after some time"));
    }
};

export const getPropertyDetails = async (dispatch, propertyId) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        if (authToken) {
            headers = { ...headers, "Authorization": `Bearer ${authToken}` };
        } else {
            headers = {};
        }
        const response = await axios.get(endUrls.getPropertyDetails.replace('ID', propertyId), { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updateDetailsOfAProperty(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the property details. Try again after some time"));
        }
    } catch (error) {
        dispatch(showErrorMessage("Failed to fetch the details of the property. Try again after some time"));
    }
}
export const getPremiumPropertyDetails = async (dispatch) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        if (authToken) {
            headers = { ...headers, "Authorization": `Bearer ${authToken}` };
        } else {
            headers = {};
        }
        const response = await axios.post(endUrls.getPremiumPropertyDetails, {}, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updateDetailsOfPremiumProperty(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the property details. Try again after some time"));
        }
    } catch (error) {

    }
}