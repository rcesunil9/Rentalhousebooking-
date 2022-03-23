import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { showLoadingIcon, showErrorMessage, hideLoadingIcon } from './errorActions';
import { SUCCESS_LOGIN_DETAILS, RESET_LOGIN_DETAILS } from '../utilities/actionTypes';

const headers = {
    'Content-Type': 'application/json'
};

const updateLoginDetails = (payload) => ({
    type: SUCCESS_LOGIN_DETAILS,
    payload
});

const resetToken = () => ({
    type: RESET_LOGIN_DETAILS
})

export const submitLoginDetails = async(dispatch, userDetails) => {
    try {
        dispatch(showLoadingIcon());
        const response = await axios.post(endUrls.login, userDetails, { headers });
        if (response.status === 200) {
            dispatch(hideLoadingIcon());
            window.localStorage.setItem("tokenId", response.data.token);
            dispatch(updateLoginDetails(response.data));
        } else {
            window.localStorage.setItem("tokenId", '');
            dispatch(showErrorMessage("Failed to login your details. Please try again after some time"));
        }
    }
    catch(error) {
        window.localStorage.setItem("tokenId", '');
        if (error.response && error.response.status === 500) {
            dispatch(showErrorMessage(error.response.data.trim()));
        } else {
            dispatch(showErrorMessage("An error has occured. Please contact Administrator! "));
        }
    }
}

export const resetUserToken = (dispatch) => {
    window.localStorage.setItem("tokenId", '');
    dispatch(resetToken());
}
