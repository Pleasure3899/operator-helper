import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from "./components/layout/MainLayout";
import { routes } from './routes/index';
import { ObjectsContext } from './context';
import Objects from "./storage/Objects.json";
import React, {useState} from 'react';

function App() {

  const [objects, setObjects] = useState(Objects.objects)

  return (
    <ObjectsContext.Provider value={{
      objects,
      setObjects
    }}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
    </ObjectsContext.Provider>
    
  );
}

export default App;
