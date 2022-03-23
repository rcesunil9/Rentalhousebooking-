import React from 'react';
import { CircularIcon } from "./style";

const RadioIcon = (props) => {
    const { checked } = props;
    return (
        <CircularIcon checked={checked} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8"></circle>
        </CircularIcon>
    )
}

export default RadioIcon;