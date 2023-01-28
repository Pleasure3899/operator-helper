import { useRef, useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import '../../styles/App.css'
import PatrolMarker from "../../components/formap/PatrolMarker";
import OptimalRoute from "../../components/formap/OptimalRoute";
//import Objects from "../../storage/Objects.json";
import Patrols from "../../storage/Patrols.json";
import Routes from "../../storage/Routes.json";
import { ObjectsContext } from '../../context'; 
import axios from "axios";
import { latLng } from 'leaflet';

const MapPage = () => {

  const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;
  const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

  const [center, setCenter] = useState(['50.90068', '34.81324']);

  const mapRef = useRef();

  const mapZoom = 13;
  const scrollWheelZoom = true;

  const [objects, setObjects] = useState([])

  useEffect(() => {
    const fetchAllObjects = async () => {
      try {
        const response = await axios.get(BECKEND_URL+"/objects");
        setObjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllObjects();
  }, []);

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


        {/*checkRoute.map(route =>
          <OptimalRoute post={route} key={route.id} />
        )*/}


        {objects.map(object =>
          <Marker key={object.id} position={latLng(object.latitude, object.longitude)}>
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
