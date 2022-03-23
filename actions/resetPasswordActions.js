import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { SUCCESS_RESET_PASSWORD } from '../utilities/actionTypes';
import { showLoadingIcon, showErrorMessage } from './errorActions';

const headers = {
    'Content-Type': 'application/json'
};

const showResetSuccess = (payload) => ({
    type: SUCCESS_RESET_PASSWORD,
    payload
});

export const resetPasswordDetails = async(dispatch, userDetails) => {
    try {
        dispatch(showLoadingIcon());
        const response = await axios.post(endUrls.changePassword, userDetails, { headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("Password reset successfully"));
            dispatch(showResetSuccess());
        } else {
            dispatch(showErrorMessage("Failed to reset password. Please try again after some time"));
        }
    }
    catch(error) {
        dispatch(showErrorMessage("Failed to reset password. Please try again after some time"));
    }
}

