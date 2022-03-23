import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { showLoadingIcon, showErrorMessage, hideLoadingIcon } from './errorActions';
import { SUCCESS_LOCATION_DETAILS } from '../utilities/actionTypes';
import { store } from '../index';

let headers = {
    'Content-Type': 'application/json'
};

const updateLocationDetails = (payload) => ({
    type: SUCCESS_LOCATION_DETAILS,
    payload
});

export const getLocationDetails = async(dispatch) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = store.getState().loginDetailsReducer.token;
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.get(endUrls.getLocationDetails, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            dispatch(updateLocationDetails(response.data));
        } else {
            dispatch(showErrorMessage("Failed to load the location details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to load the location details. Try again after some time"));
    }
}

export const addNewLocation = async(dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.post(endUrls.addLocations, payload ,{ headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Details saved successfully"));
        } else {
            dispatch(showErrorMessage("Failed to save location details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to save location details. Try again after some time"));
    }
}

export const updateLocation = async(dispatch, payload) => {
    try {
        dispatch(showLoadingIcon());
        const authToken = window.localStorage.getItem("tokenId");
        headers = {...headers, "Authorization": "Bearer " + authToken};
        const response = await axios.put(endUrls.addLocations + `/${payload.id}`, payload ,{ headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Details updated successfully"));
        } else {
            dispatch(showErrorMessage("Failed to update location details. Try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to update location details. Try again after some time"));
    }
}