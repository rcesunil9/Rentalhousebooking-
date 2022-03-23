import axios from 'axios';
import endUrls from '../utilities/endpoints';
import { showLoadingIcon, showErrorMessage } from './errorActions';

const headers = {
    'Content-Type': 'application/json'
};

export const submitRegistrationDetails = async(dispatch, userDetails) => {
    try {
        dispatch(showLoadingIcon());
        const response = await axios.post(endUrls.register, userDetails, { headers });
        if (response.status === 200) {
            dispatch(showErrorMessage("User registered successfully."));
        } else {
            dispatch(showErrorMessage("Failed to register your details. Please try again after some time"));
        }
    }
    catch(error) {
        if (error.response.status === 500 && error.response.data ==="'register.user.exist'") {
            dispatch(showErrorMessage("User already exist."));
        } else {
            dispatch(showErrorMessage("Failed to register your details. Please try again after some time"));
        }
        
    }
}

