import React, { useState } from "react";
import registerService from "../services/register";
import { useNavigate } from "react-router-dom";

export default function register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    await registerService
      .registration(email, name, subName, password, confirmPassword)
      .then((userCreated) => {
        // Verificar la respuesta del servicio
        if (userCreated.status === "success") {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setName("");
          setSubName("");
          navigate("/login");

          // Redireccionar a la página de inicio de sesión
          navigate("/login");
        } else {
          console.error(userCreated.status);
          // Manejar el error si es necesario
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <section className="h-screen flex  justify-center items-center">
      <div className="bg-gray-300 rounded-lg items-center justify-center flex h-[%80] w-[60%]  p-4">
        <form className="flex flex-col " onSubmit={handleRegister}>
          <label htmlFor="email">Email</label>
          <input
            className="mb-5"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="username">Name</label>
          <input
            className="mb-5"
            type="text"
            name="username"
            placeholder="Username"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="subName">Last Name</label>
          <input
            className="mb-5"
            type="text"
            name="subName"
            placeholder="LastName"
            value={subName}
            onChange={(event) => setSubName(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="mb-5"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="mb-5"
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button
            className="text-white w-full  bg-[#7d7e7f] hover:bg-gray-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            type="submit"
          >
            Sign In
          </button>
          <div className="text-center text-sm hover:underline">
            <a href="http://localhost:5173/login">Login In</a>
          </div>
        </form>
      </div>
    </section>
  );
}
