import React, { useEffect, useState } from "react";
import {
    ModalContainer,
    SubmitPropButton,
    ErrorMessage,
    ProfilePicUploader
} from "./style";

const customStyles = {
    content: {
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: '999999999 !important',
        border: '2px solid #00acc1',
        padding: '20px',
        outline: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(238, 238, 238, 0.95)'
    }
}

const AddFloorPlanImages = (props) => {
    const { showPropertyFloorModal, closeFloorImagesModal, propId, saveImages, propertyFloorImages, addPropPictures } = props;
    const [pictures, updatePictures] = useState(propertyFloorImages);

    useEffect(() => {
        updatePictures(propertyFloorImages);
    }, [propertyFloorImages]);

    const onDrop = (event, newPropertyFloorImage) => {
        saveImages(newPropertyFloorImage);
        updatePictures(newPropertyFloorImage);
    }

    return (
        <ModalContainer  className="row" isOpen={ showPropertyFloorModal } onRequestClose={ closeFloorImagesModal } style={ customStyles }>
            <ErrorMessage>{ `Property ID - ` + propId }</ErrorMessage>
            <ProfilePicUploader
                defaultImages={pictures}
                showOtherContent={pictures.length === 0} 
                withPreview
                withIcon={true}
                buttonText='UPLOAD FLOOR PLAN PICS'
                onChange={ onDrop }
                imgExtension={['.jpg', '.png']}
                maxFileSize={3145728}
                fileSizeError="Floor plan pic cannot be greater than 3MB"
                fileTypeError="Please upload JPG and PNG format images"
            />
            <SubmitPropButton color="primary" onClick={ addPropPictures }>Save Images</SubmitPropButton>
        </ModalContainer>
    )
}

export default AddFloorPlanImages;