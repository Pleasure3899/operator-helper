import { useRef, useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import '../../styles/App.css'
import PatrolMarker from "../../components/formap/PatrolMarker";
import OptimalRoute from "../../components/formap/OptimalRoute";
import Patrols from "../../storage/Patrols.json";
import Routes from "../../storage/Routes.json";
import { ObjectsContext } from '../../context'; 
import axios from "axios";
import { latLng } from 'leaflet';
import { Toaster } from 'react-hot-toast';

const MapPage = () => {

  const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;
  const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

  const [center, setCenter] = useState(['50.90068', '34.81324']);

  const mapRef = useRef();

  const mapZoom = 13;
  const scrollWheelZoom = true;

  const [objects, setObjects] = useState([])
  const [patrols, setPatrols] = useState([])

  useEffect(() => {
    const fetchAllObjects = async () => {
      try {
        const response = await axios.get(BECKEND_URL+"/objects");
        setObjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllPatrols = async () => {
      try {
        const response = await axios.get(BECKEND_URL+"/patrols");
        setPatrols(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllObjects();
    fetchAllPatrols();
  }, [BECKEND_URL]);

  const [checkRoute, setCheckRoutes] = useState(Routes.routes)

  return (
    <div className="Map">
      <Toaster ></Toaster>
      <MapContainer dragging={scrollWheelZoom} center={center} zoom={mapZoom} ref={mapRef}>
        <TileLayer
          attribution='Дані карт © АТ «<a href="https://api.visicom.ua/">Visicom</a>»'
          url={"https://tms{s}.visicom.ua/2.0.0/ua/base/{z}/{x}/{y}.png?key=" + VISICOM_API_KEY}
          subdomains={'123'}
          tms={true}
        />

        {patrols.map(patrol =>
        patrol.patrol_is_active !== 0 && <PatrolMarker patrol={patrol} key={patrol.id} />
        )}


        {/*checkRoute.map(route =>
          <OptimalRoute post={route} key={route.id} />
        )*/}


        {objects.map(object =>
        object.object_is_active !== 0 &&
          <Marker key={object.id} position={latLng(object.latitude, object.longitude)}>
            <Popup>
              Об'єкт {object.id}
            </Popup>
          </Marker>
        )}


      </MapContainer>

    </div>

      );
    }

export default MapPage;
