import React from 'react';
import { Popup, CircleMarker} from 'react-leaflet'

const PatrolMarker = (props) => {
    
    const markerRadius = 10;
    const markerColor = "red";

    return (
        <CircleMarker center={props.post.position} radius={markerRadius} color={markerColor}>
          <Popup>PatrolID - {props.post.id}</Popup>
        </CircleMarker>
    );
};

export default PatrolMarker;