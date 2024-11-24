import { useState, useEffect } from "react";
import { Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Profiles from "./pages/Profiles";

import "./App.css";

function App() {
  const [authenticate, setAuthenticate] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3900/login/check-auth"
        );
        if (response) {
          setAuthenticate(response.data.user);
        } else {
          setAuthenticate(false);
        }
      } catch (error) {
        console.error("Error al obtener session");
        setAuthenticate(false);
      } finally {
        setLoading(false); // Marcar la carga como completada
      }
    };
    getUser();
  }, []);

  if (loading) {
    return "espere";
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={authenticate ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            authenticate ? (
              <Home user={authenticate} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile/:id?"
          element={
            authenticate ? (
              <Profile user={authenticate} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profiles/:id?"
          element={<Profiles user={authenticate} />}
        ></Route>
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
