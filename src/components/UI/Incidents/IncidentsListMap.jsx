import React from 'react'
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

const IncidentsListMap = (props) => {

    const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;
    const coordinates = [props.latitude, props.longitude]
    const mapRef = useRef();
    const mapZoom = 16;
    const scrollWheelZoom = false;

    return (
            <MapContainer
                dragging={scrollWheelZoom}
                center={coordinates} zoom={mapZoom}
                ref={mapRef}>
                <TileLayer
                    attribution='Дані карт © АТ «<a href="https://api.visicom.ua/">Visicom</a>»'
                    url={"https://tms{s}.visicom.ua/2.0.0/ua/base/{z}/{x}/{y}.png?key=" + VISICOM_API_KEY}
                    subdomains={'123'}
                    tms={true}
                />

                    <Marker position={coordinates}>
                    </Marker>

            </MapContainer>
    );
};

export default IncidentsListMap;