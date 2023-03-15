import React from 'react';
import { Popup, CircleMarker} from 'react-leaflet'
import { latLng } from 'leaflet';

const PatrolMarker = (props) => {
    
    const markerRadius = 10;
    const markerColor = "red";

    return (
        <CircleMarker center={latLng(props.patrol.latitude, props.patrol.longitude)} radius={markerRadius} color={markerColor}>
          <Popup>Бригада {props.patrol.id}</Popup>
        </CircleMarker>
    );
};

export default PatrolMarker;