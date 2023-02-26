import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from "./components/layout/MainLayout";
import { routes } from './routes/index';
import { IncidentsContext } from './context';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import IncidentsToast from './components/common/IncidentsToast';


function App() {

  const [uncheckedIncidents, setUncheckedIncidents] = useState([])

  useEffect(() => {

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

    const fetchAllIncidents = async () => {
      try {
        const response = await axios.get(BECKEND_URL + "/unchecked-incidents");
        setUncheckedIncidents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    function noDelaySetInterval(func, interval) {
      func();
      return setInterval(func, interval);
    }

    noDelaySetInterval(fetchAllIncidents, 2000);

  }, []);

  return (
    <IncidentsContext.Provider value={{
      uncheckedIncidents,
      setUncheckedIncidents
    }}>
      <BrowserRouter>
        {uncheckedIncidents.length !== 0 && <IncidentsToast />}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
    </IncidentsContext.Provider>

  );
}

export default App;
