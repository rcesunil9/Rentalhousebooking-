import axios from 'axios';
import qs from 'querystring';
import endUrls from '../utilities/endpoints';
import {showErrorMessage, hideLoadingIcon } from './errorActions';
//Removed showLoadingIcon from above import
import { SUCCESS_CUSTOMER_DETAILS, UPDATE_CUSTOMER_DETAILS, RESET_CUSTOMER_DATA } from '../utilities/actionTypes';
import { store } from '../index';

let headers = {
    'Content-Type': 'application/json'
};

const updateCustomerDetails = (payload) => ({
    type: SUCCESS_CUSTOMER_DETAILS,
    payload
});

export const changeCustomerDetails = (dispatch, payload) => {
    dispatch({ type: UPDATE_CUSTOMER_DETAILS, payload });
};

export const resetCustomerData = (dispatch) => {
    dispatch({ type: RESET_CUSTOMER_DATA });
};

export const getCustomerDetails = async (dispatch) => {
    try {
        //dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        if (authToken) {
            headers = { ...headers, "Authorization": "Bearer " + authToken };
        } else {
            return;
        }
        
        const response = await axios.get(endUrls.getCustomerDetails, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updateCustomerDetails(response.data || {}));
        } else {
            dispatch(showErrorMessage("Failed to update the customer details. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to update the customer details. Try again after some time"));
    }
}

export const updateCustomerData = async (dispatch) => {
    try {
        //dispatch(showLoadingIcon());
        let customerData = Object.assign({}, store.getState().customerDetailsReducer.customerData);
        delete customerData.user;
        delete customerData.error;
        const file = customerData.photo;
        delete customerData.photo
        customerData = JSON.stringify(customerData);
        const authToken = window.localStorage.getItem("tokenId");
        headers = { 'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + authToken };
        const response = await axios.post(endUrls.getCustomerDetails, qs.stringify({ customer: customerData, file }), { headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Details saved successfully"));
        } else {
            dispatch(showErrorMessage("Failed to load the customer details. Try again after some time"));
        }
    }
    catch (error) {
        dispatch(showErrorMessage("Failed to load the customer details. Try again after some time"));
    }
}