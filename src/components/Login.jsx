import React, { useContext, useEffect, useState } from "react";
import "../styles/login.css";
import "../styles/index.css";
import "../styles/header.css"
import { UserProvider } from "../context/UserListProvider";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LogError from "./LogError";


const Login = () => {

    const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [logError, setLogError] = useState(false);

  const { setUserList, userList, setIsLogged, isLogged } = useContext(UserProvider);

  const URL_GET = `https://token-api-wine.vercel.app`;
  const URL_POST = `https://token-api-wine.vercel.app/auth`;

  const getToken = async (url) => {
    const response = await fetch(URL_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    return data.bearer_token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getToken(URL_POST);

    fetch(URL_GET, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.code === 200) {
          setUserList(data);
          setIsLogged(true)
        } else {
          setLogError(true)
          setTimeout(() => {
            setLogError(false);
          }, 2000)
          setIsLogged(false)
        }
      });

    console.log(userList);

  };

  useEffect(() => {
    if(!isLogged) {
        navigate('/');
    } else {
        navigate('/users')
    }
  }, [navigate, isLogged])

  return (
    <div className="content">
    <div className="headerImg"></div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </div>
        {
          logError && <LogError />
        }
        <input type="submit" value="Acceder" />
      </form>
    </div>
  );
};

export default Login;
