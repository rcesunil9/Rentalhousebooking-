import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { showLoadingIcon, showErrorMessage, hideLoadingIcon } from './errorActions';
import { SUCCESS_PROPERTY_TYPES } from '../utilities/actionTypes';
import { store } from '../index';

let headers = {
    'Content-Type': 'application/json'
};

const updatePropertyType = (payload) => ({
    type: SUCCESS_PROPERTY_TYPES,
    payload
});

export const getPropertyType = async(dispatch) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = store.getState().loginDetailsReducer.token;
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.get(endUrls.getPropertyTypes, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updatePropertyType(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the property type details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to load the property type details. Try again after some time"));
    }
}

export const addNewPropertyType = async(dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.post(endUrls.addPropertyType, payload ,{ headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Details saved successfully"));
        } else {
            dispatch(showErrorMessage("Failed to save property type details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to save property type details. Try again after some time"));
    }
}

export const addFeedback = async(dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.post(endUrls.addFeedback, payload ,{ headers });
        if (response.status === 200) {
            console.log(payload,dispatch)

            dispatch(showErrorMessage("Details saved successfully"));
        } else {
            console.log(payload,dispatch)

            dispatch(showErrorMessage("Failed to save property type details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to save property type details. Try again after some time"));
    }
}
export const addContact = async(dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.post(endUrls.addContact, payload ,{ headers });
        if (response.status === 200) {
            console.log(payload,dispatch)

            dispatch(showErrorMessage("Details saved successfully"));
        } else {
            console.log(payload,dispatch)

            dispatch(showErrorMessage("Failed to save property type details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to save property type details. Try again after some time"));
    }
}
export const updateProperty = async(dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.put(endUrls.addPropertyType + `/${payload.id}`, payload ,{ headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Details updated successfully"));
        } else {
            dispatch(showErrorMessage("Failed to update property type details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to update property type details. Try again after some time"));
    }
}