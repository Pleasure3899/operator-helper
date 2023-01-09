import React, {useEffect, useState} from 'react';
import { GeoJSON } from 'react-leaflet'
import axios from "axios";


const OptimalRoute = (props) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = React.useState();

    useEffect(() => {
      getData();
    }, []);
    

    const getData = async () => {
      // 'await' the data
      const response = await axios.get("https://api.visicom.ua/data-api/5.0/core/distance.json?origin="+props.post.original+"&destination="+props.post.destination+"&geometry=path&mode=driving-shortest&key="+process.env.REACT_APP_VISICOM_API_KEY);
      // save data to state
      setData(response.data);
    };
  
    // render react-leaflet GeoJSON when the data is ready
    if (data) {
      props.post.distance=data.properties.distance;
      return <GeoJSON data={data} />;
    } else {
      return null;
    }
  };



/*const OptimalRoute = (props) => {

    //const [checkRoute, setcheckRoute] = useState([
        //{id: props.post.id, original: props.post.original, destination: props.post.destination},
      //])

        return (
  
            <MyData post={{id: props.post.id, original: props.post.original, destination: props.post.destination, distance: props.post.distance}} /> 
    
        );

   
}; 
*/
export default OptimalRoute;

