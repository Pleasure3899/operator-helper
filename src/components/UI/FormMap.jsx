import React from 'react'
import { useRef, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

const FormMap = (props) => {

    const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;
    const center = ['50.90698', '34.80194']
    const [markerPosition, setMarkerPosition] = useState([]);
    const mapRef = useRef();
    const mapZoom = 13;
    const scrollWheelZoom = true;

    return (
        <div className="formmap">
            <MapContainer
                whenReady={(map) => {
                    map.target.on("click", function (e) {
                        setMarkerPosition([...markerPosition, { lat: e.latlng.lat, lng: e.latlng.lng }]);
                        props.setCoordinates(e)
                    });
                }}
                dragging={scrollWheelZoom}
                center={center} zoom={mapZoom}
                ref={mapRef}>
                <TileLayer
                    attribution='Дані карт © АТ «<a href="https://api.visicom.ua/">Visicom</a>»'
                    url={"https://tms{s}.visicom.ua/2.0.0/ua/base/{z}/{x}/{y}.png?key=" + VISICOM_API_KEY}
                    subdomains={'123'}
                    tms={true}
                />

                {markerPosition.map(marker=>
                    <Marker key={Date.now()} position={[marker.lat, marker.lng]}>
                        <Popup>
                            Широта - {marker.lat} <br />
                            Довгота - {marker.lng}
                        </Popup>
                    </Marker>
                )}

            </MapContainer>
        </div>
    );
};

export default FormMap;