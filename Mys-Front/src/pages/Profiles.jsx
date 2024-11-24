import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import userService from "../services/user";
import publicationService from "../services/publication";
import Publication from "../components/publication";
import { useParams, useNavigate } from "react-router-dom";
import ScrollInfinite from "../components/ScrollInfinite";

export default function Profiles(props) {
  const userLogin = props.user; //usuario loggeado
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFollow = async () => {};

  useEffect(() => {
    let userProfile = "";
    const fetchData = async () => {
      try {
        //Obtenemos perfiles de usuario
        const followers = await userService.followers(userLogin._id);
        console.log(followers);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setLoading(false); // Marcar la carga como completada incluso en caso de error
      }
    };

    fetchData();
  }, []);

  // Mostrar un mensaje de carga mientras se espera la respuesta de la solicitud
  if (loading) {
    return (
      <>
        <div>Cargando perfil...</div>
      </>
    );
  }

  return (
    <>
      <NavBar user={userLogin} />
      <div className="flex items-center p-20 w-full justify-center">
        <button>Show More</button>
      </div>
    </>
  );
}
