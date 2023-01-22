import { useRef, useState, useContext } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import '../../styles/App.css'
import PatrolMarker from "../../components/formap/PatrolMarker";
import OptimalRoute from "../../components/formap/OptimalRoute";
//import Objects from "../../storage/Objects.json";
import Patrols from "../../storage/Patrols.json";
import Routes from "../../storage/Routes.json";
import { ObjectsContext } from '../../context'; 

const MapPage = () => {

  const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;

  const [center, setCenter] = useState(['50.90068', '34.81324']);

  const mapRef = useRef();

  const mapZoom = 13;
  const scrollWheelZoom = true;

  const {objects, setObjects} = useContext(ObjectsContext)

  const [patrols, setPatrols] = useState(Patrols.patrols)

  const [checkRoute, setCheckRoutes] = useState(Routes.routes)
  
  //const [objects, setObjects] = useState(Objects.objects)


  return (
    <div className="Map">

      <MapContainer dragging={scrollWheelZoom} center={center} zoom={mapZoom} ref={mapRef}>
        <TileLayer
          attribution='Дані карт © АТ «<a href="https://api.visicom.ua/">Visicom</a>»'
          url={"https://tms{s}.visicom.ua/2.0.0/ua/base/{z}/{x}/{y}.png?key=" + VISICOM_API_KEY}
          subdomains={'123'}
          tms={true}
        />

        {patrols.map(patrol =>
          <PatrolMarker post={patrol} key={patrol.id} />
        )}


        {checkRoute.map(route =>
          <OptimalRoute post={route} key={route.id} />
        )}


        {objects.map(object =>
          <Marker key={object.id} position={object.coordinates}>
            <Popup>
              ObjectID - {object.id}
            </Popup>
          </Marker>
        )}


      </MapContainer>

    </div>

      );
    }

export default MapPage;
