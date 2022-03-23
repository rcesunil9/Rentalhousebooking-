import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { showLoadingIcon, showErrorMessage } from './errorActions';
import { SUCCESS_FORGOT_PWD, RESET_FORGOT_PWD } from '../utilities/actionTypes';

const headers = {
    'Content-Type': 'application/json'
};

const updatePwdDetails = (payload) => ({
    type: SUCCESS_FORGOT_PWD,
    payload
});

const resetPwd = () => ({
    type: RESET_FORGOT_PWD
});

export const submitPwdDetails = async(dispatch, userDetails) => {
    try {
        dispatch(showLoadingIcon());
        const url = endUrls.forgotPwd + '?email=' + userDetails;
        const response = await axios.post(url, userDetails, { headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Reset link is sent on your registered mail ID"));
            dispatch(updatePwdDetails(response.data));
        } else {
            dispatch(resetPwd());
            dispatch(showErrorMessage("Failed to update your password. Please try again after some time"));
        }
    }
    catch(error) {
        dispatch(resetPwd());
        dispatch(showErrorMessage("Failed to update your password. Please try again after some time"));
    }
}

