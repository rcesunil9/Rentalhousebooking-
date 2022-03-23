import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  SubmitPropButton,
  ErrorMessage,
  ProfilePicUploader,
} from "./style";

const customStyles = {
  content: {
    position: "fixed",
    backgroundColor: "white",
    zIndex: "999999999 !important",
    border: "2px solid #00acc1",
    padding: "20px",
    outline: "none",
  },
  overlay: {
    backgroundColor: "rgba(238, 238, 238, 0.95)",
  },
};

const AddPropertyImages = (props) => {
  const {
    showPropertyModal,
    closeModal,
    propId,
    saveImages,
    propertyImages,
    addPropPictures,
  } = props;
  const [pictures, updatePictures] = useState(propertyImages);

  useEffect(() => {
    updatePictures(propertyImages);
  }, [propertyImages]);

  const onDrop = (event, imagesData) => {
    saveImages(imagesData);
    updatePictures(imagesData);
  };

  return (
    <ModalContainer
      className="row"
      isOpen={showPropertyModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <ErrorMessage>{`Property ID - ` + propId}</ErrorMessage>
      <ProfilePicUploader
        defaultImages={pictures}
        showOtherContent={pictures.length === 0}
        withPreview
        withIcon={true}
        buttonText="UPLOAD PROPERTY PICS"
        onChange={onDrop}
        imgExtension={[".jpg", ".png", ".jpeg"]}
        maxFileSize={3145728}
        fileSizeError="Property pic cannot be greater than 3MB"
        fileTypeError="Please upload JPEG, JPG and PNG format images"
      />
      <SubmitPropButton color="primary" onClick={addPropPictures}>
        Save Images
      </SubmitPropButton>
    </ModalContainer>
  );
};

export default AddPropertyImages;
