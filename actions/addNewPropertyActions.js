import axios from "axios";
import qs from "querystring";
import endUrls from "../utilities/endpoints";
import { getMessage } from "../utilities/content";
import {
  showLoadingIcon,
  showErrorMessage,
  hideLoadingIcon,
} from "./errorActions";
import {
  UPDATE_PROPERTY_DETAILS,
  SAVE_PROPERTY_DETAILS,
  UPDATE_PROPERTY_PIC,
  RESET_PROPERTY_DATA,
  UPDATE_PROPERTY_FLOOR_PIC,
  GET_PROPERTY_DETAILS,
  UPDATE_PROPERTY_CHECKBOX_DETAILS,
} from "../utilities/actionTypes";
import { store } from "../index";

let headers = {
  "Content-Type": "application/json",
};

const updateProperty = (payload) => ({
  type: SAVE_PROPERTY_DETAILS,
  payload,
});

const updateSelectedProperty = (payload) => ({
  type: GET_PROPERTY_DETAILS,
  payload,
});

export const changePropertyDetails = (dispatch, payload) => {
  dispatch({ type: UPDATE_PROPERTY_DETAILS, payload });
};

export const updateCheckboxDetails = (dispatch, payload) => {
  dispatch({ type: UPDATE_PROPERTY_CHECKBOX_DETAILS, payload });
};

export const uploadNewPhoto = (dispatch, payload) => {
  dispatch({ type: UPDATE_PROPERTY_PIC, payload });
};

export const uploadNewFloorPhoto = (dispatch, payload) => {
  dispatch({ type: UPDATE_PROPERTY_FLOOR_PIC, payload });
};

export const resetPropertyData = (dispatch) => {
  dispatch({ type: RESET_PROPERTY_DATA });
};

export const addNewProperties = async (
  dispatch,
  checkboxData,
  urlPropertyId
) => {
  try {
    dispatch(showLoadingIcon());
    const authToken = window.localStorage.getItem("tokenId");
    let { propertyData } = store.getState().addPropertyReducer;
    const { customerData } = store.getState().customerDetailsReducer;
    propertyData = {
      ...propertyData,
      status: !!propertyData.status ? propertyData.status : "NotApproved",
      customer: !!urlPropertyId
        ? propertyData.customer
        : { id: customerData.id },
    };
    delete propertyData.photos;
    delete propertyData.floorplans;
    propertyData.propertyDetails = {
      ...propertyData.propertyDetails,
      ...checkboxData,
    };
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    };
    const response = await axios.post(endUrls.addNewProperties, propertyData, {
      headers,
    });
    if (response.status === 200) {
      dispatch(hideLoadingIcon());
      !!urlPropertyId
        ? dispatch(showErrorMessage("Details saved successfully"))
        : dispatch(updateProperty(response.data));
    } else {
      dispatch(
        showErrorMessage("Failed to add properties. Try again after some time")
      );
    }
  } catch (error) {
    dispatch(
      showErrorMessage("Failed to add properties. Try again after some time")
    );
  }
};

export const quickPropertyUpdate = async (dispatch, dataChanged) => {
  try {
    dispatch(showLoadingIcon());
    const authToken = window.localStorage.getItem("tokenId");
    let { propertyData } = store.getState().addPropertyReducer;
    const { customerData } = store.getState().customerDetailsReducer;
    propertyData = { ...propertyData, customer: { id: customerData.id } };
    delete propertyData.photos;
    delete propertyData.floorplans;
    propertyData.propertyDetails = { ...propertyData.propertyDetails };
    headers = { ...headers, Authorization: "Bearer " + authToken };
    const response = await axios.post(endUrls.addNewProperties, propertyData, {
      headers,
    });
    if (response.status === 200) {
      const msg = getMessage(dataChanged);
      dispatch(showErrorMessage(msg));
    } else {
      dispatch(
        showErrorMessage("Failed to add properties. Try again after some time")
      );
    }
  } catch (error) {
    dispatch(
      showErrorMessage("Failed to add properties. Try again after some time")
    );
  }
};

export const getPropertyData = async (dispatch, propertyId) => {
  try {
    dispatch(showLoadingIcon());
    const authToken = window.localStorage.getItem("tokenId");
    headers = { ...headers, Authorization: "Bearer " + authToken };
    const url = endUrls.getPropertyData + `/${propertyId}`;
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      dispatch(hideLoadingIcon());
      response.data.propertyDetails.depositMonth =
        response.data.propertyDetails.deposit / response.data.rent + "";
      response.data.propertyDetails.bathrooms =
        response.data.propertyDetails.bathrooms + "";
      dispatch(updateSelectedProperty(response.data));
    } else {
      dispatch(
        showErrorMessage("Failed to edit property. Try again after some time")
      );
    }
  } catch (error) {
    dispatch(
      showErrorMessage("Failed to edit property. Try again after some time")
    );
  }
};

export const addNewImages = async (dispatch, photo) => {
  try {
    dispatch(showLoadingIcon());
    const authToken = window.localStorage.getItem("tokenId");
    const { id } = store.getState().addPropertyReducer;
    headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + authToken,
    };
    const response = await axios.post(
      endUrls.addPropertiesImages + `${id}`,
      qs.stringify({ file: JSON.stringify(photo) }),
      { headers }
    );
    if (response.status !== 200) {
      dispatch(
        showErrorMessage(
          "Failed to add property images. Try again after some time"
        )
      );
    } else {
      dispatch(hideLoadingIcon());
    }
  } catch (error) {
    dispatch(
      showErrorMessage(
        "Failed to add property images. Try again after some time"
      )
    );
  }
};

export const addNewFloorImages = async (dispatch, floorPhoto) => {
  try {
    dispatch(showLoadingIcon());
    const authToken = window.localStorage.getItem("tokenId");
    const { id } = store.getState().addPropertyReducer;
    headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + authToken,
    };
    const response = await axios.post(
      endUrls.addPropertiesFloorImages + `${id}`,
      qs.stringify({ floorPlan: JSON.stringify(floorPhoto) }),
      { headers }
    );
    if (response.status === 200) {
      dispatch(showErrorMessage("Details saved successfully"));
    } else {
      dispatch(
        showErrorMessage(
          "Failed to add property floor plan images. Try again after some time"
        )
      );
    }
  } catch (error) {
    dispatch(
      showErrorMessage(
        "Failed to add property floor plan images. Try again after some time"
      )
    );
  }
};
