import { useRef, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import '../../styles/App.css'
import PatrolMarker from "../../components/formap/PatrolMarker";
import OptimalRoute from "../../components/formap/OptimalRoute";

const MapPage = () => {

  const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;

  const [center, setCenter] = useState(['50.90068', '34.81324']);

  const mapRef = useRef();

  const mapZoom = 13;
  const scrollWheelZoom = true;

  const [patrols, setPatrol] = useState([
    { id: 1, position: ['50.91027', '34.82542'] },
    { id: 2, position: ['50.90695', '34.78348'] },
    { id: 3, position: ['50.94148', '34.80501'] },
    { id: 4, position: ['50.88361', '34.81663'] },
    { id: 5, position: ['50.89432', '34.75953'] },
  ])

  const [checkRoute, setCheckRoute] = useState([
    { id: 1, patrolId: 2, objectId: 1, original: ['34.78348', '50.90695'], destination: ['34.81053', '50.90025'], distance: "3051"},
    { id: 2, patrolId: 3, objectId: 5, original: ['34.80501', '50.94148'], destination: ['34.75893', '50.93435'], distance: "5184"},
  ])
  
  const [objects, setObject] = useState([
    { id: 1, coordinates: ['50.90025', '34.81053'] },
    { id: 2, coordinates: ['50.90279', '34.84015'] },
    { id: 3, coordinates: ['50.91324', '34.78945'] },
    { id: 4, coordinates: ['50.91883', '34.77599'] },
    { id: 5, coordinates: ['50.93435', '34.75893'] },
    { id: 6, coordinates: ['50.91575', '34.75114'] },
    { id: 7, coordinates: ['50.92256', '34.80706'] },
    { id: 8, coordinates: ['50.89346', '34.76309'] },
    { id: 9, coordinates: ['50.88645', '34.78335'] },
    { id: 10, coordinates: ['50.88977', '34.82244'] },
    { id: 11, coordinates: ['50.91003', '34.75857'] },
    { id: 12, coordinates: ['50.92801', '34.83013'] },
    { id: 13, coordinates: ['50.94868', '34.74213'] },
    { id: 14, coordinates: ['50.89825', '34.78188'] },
    { id: 15, coordinates: ['50.91771', '34.81587'] },
    { id: 16, coordinates: ['50.91134', '34.80507'] },
  ])

  const [dummyPatrol, setDummyPatrol] = useState(patrols[0]);
  const [dummyObject, setDummyObject] = useState(objects[0]);
  const [dummyRoute, setDummyRoute] = useState(checkRoute[0]);
  const [dummyDistance, setDummyDistance] = useState([]);

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
