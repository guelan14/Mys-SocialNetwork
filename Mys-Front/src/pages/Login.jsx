import React, { useEffect, useState } from "react";
import loginService from "../services/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!email || !password) {
        throw new Error(
          "Por favor, ingresa tu correo electrónico y contraseña."
        );
      }

      const userToLogin = await loginService.login(email, password);
      if (userToLogin) {
        // Inicio de sesión exitoso, redirige al usuario a la página principal
        window.location.href = "/"; // O utiliza el enrutador de tu elección
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="bg-gray-300 rounded-lg flex h-80 ">
          <div className="w-auto flex flex-col  items-center h-80 p-4">
            <h1 className="text-center text-3xl font-bold pb-10">Mys !</h1>
            <p className="ps-10">
              Mys es un prototipo de Red Social para aplicar conocimientos
              aprendidos
            </p>
            <p className="ps-10">
              Mys is a Social Network prototype to apply learned knowledge.
            </p>
          </div>
          <form
            className="flex items-center border p-4 flex-col gap-5"
            onSubmit={handleLogin}
          >
            <input
              className="px-2 rounded-lg py-1.5"
              type="text"
              value={email}
              name="correo"
              placeholder="Correo Electronico "
              onChange={({ target }) => setEmail(target.value)}
            ></input>
            <input
              className="px-2 rounded-lg py-1.5"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></input>
            <button className="text-white w-full  bg-[#7d7e7f] hover:bg-gray-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center  items-center justify-between ">
              Log In
            </button>

            <div className="w-full px-6 sm:px-0 max-w-sm">
              <button
                type="button"
                onClick={() =>
                  (window.location.href = "http://localhost:3900/auth/google")
                }
                className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55"
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign up with Google
              </button>
            </div>
            <a
              className="hover:underline"
              href="http://localhost:5173/register"
            >
              Create account
            </a>
          </form>
        </div>
      </section>
    </>
  );
}
