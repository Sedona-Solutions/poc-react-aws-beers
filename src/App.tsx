import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import BeerDetails from "./pages/BeerDetails";
import BeersList from "./pages/BeersList";
import BeerCreate from "./pages/BeerCreate";
import Login from "./pages/Login";
import React, {useState} from "react";
import {AuthenticationModel} from "./models/AuthenticationModel";
import {AuthenticationContext} from "./contexts/authentication-context";
import Header from "./components/Header";
import {useAuthentication} from "./hooks/authentication-hook";

function App() {
  const {retrieveAuth} = useAuthentication()
  const currentAuthentication = retrieveAuth();

  const [authentication, setAuthentication] = useState<AuthenticationModel>(currentAuthentication);
  return (
    <div className="App">
      <AuthenticationContext.Provider value={{authentication, setAuthentication}}>
        <Header/>
        <BrowserRouter>
          {authentication ?
            <Routes>
              <Route path="/beers/create" element={<BeerCreate/>}/>
              <Route path="/beers/:beerId" element={<BeerDetails/>}/>
              <Route path="/beers" element={<BeersList/>}/>
              <Route path="*" element={<Navigate to="/beers"/>}/>
            </Routes> :
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
          }
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </div>
  )
}

export default App
