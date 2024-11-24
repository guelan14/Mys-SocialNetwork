import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import userService from "../services/user";
import publicationService from "../services/publication";
import Publication from "../components/publication";
import { useParams, useNavigate } from "react-router-dom";
import ScrollInfinite from "../components/ScrollInfinite";

export default function Profile(props) {
  const userLogin = props.user; //usuario loggeado
  let { id } = useParams(); //id del usuario de la publicacion
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(null);
  const [following, setFollowings] = useState(0);
  const [follower, setFollowers] = useState(0);

  const handleFollow = async () => {
    if (follow === true) {
      const followResponse = await userService.followUser(id);
      setFollow(false);
      setFollowers((prevFollowers) => prevFollowers + 1); // Restar 1 al número de seguidos
    } else {
      const unfollowResponse = await userService.unfollowUser(id);
      setFollow(true);
      setFollowers((prevFollowers) => prevFollowers - 1); // Sumar 1 al número de seguidos
    }
  };

  //obtenemos los posts
  const getFeed = async (page) => {
    console.log("ESTO ES EN PROFILE", page);
    return await publicationService.getMyPublications(user._id, page); // Función para obtener tus propias publicaciones
  };

  useEffect(() => {
    let userProfile = "";
    const fetchData = async () => {
      try {
        //Obtenemos perfil del usuario
        userProfile = await userService.getProfileUser(id);
        if (!userProfile) navigate("/login");
        setUser(userProfile);

        //Verificamos si esta seguido o no
        const userFollow = await userService.findFollow(id);
        setFollow(!userFollow.success);

        const followingNumber = await userService.followingsNumber(id);
        setFollowings(followingNumber.data.follows);

        const followerNumber = await userService.followersNumber(id);
        console.log(followerNumber);
        setFollowers(followerNumber.data.followers);

        setLoading(false); // Marcar la carga como completada
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
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={user.image}
                alt="John Doe"
              />
            </div>
            <div className="p-2">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                {user.fullname}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>{user.bio}Usuario</p>
                {id !== userLogin._id && (
                  <a
                    onClick={() => {
                      handleFollow(user);
                    }}
                    className="text-lg uppercase font-semibold text-blue-400 hover:text-blue-600"
                  >
                    {follow ? "Follow" : "Unfollow"}
                  </a>
                )}
              </div>

              <table className="text-xs my-3">
                <thead>
                  <tr>
                    <th scope="col">Following</th>
                    <th className="text-start" scope="col">
                      Followers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{following}</td>
                    <td>{follower}</td>
                  </tr>

                  <tr>
                    <td className="  text-gray-500 font-semibold">Email</td>
                    <td className="">{user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ScrollInfinite user={user} getFeed={getFeed} />
    </>
  );
}
