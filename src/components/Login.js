import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from '../constants';
import rotatingImage from "./pngwing.com.png";
import "../styles/Login.css";
const LOGIN_MUTATION = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ tokenAuth }) => {
      localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
      navigate('/home');
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: "100vh" }}>
      <div>
        <h4 className="mv3 text-white"></h4>
        <div className="position-relative">
          <img src={rotatingImage} alt="Rotating Image" className="rotating-image" />
          <form onSubmit={handleFormSubmit} className="d-flex flex-column">
            <input
              value={formState.username}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  username: e.target.value,
                })
              }
              type="text"
              placeholder="Your username"
              className="mb-3 form-control"
            />
            <input
              value={formState.password}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value,
                })
              }
              type="password"
              placeholder="Choose a safe password"
              className="mb-3 form-control"
            />
            <div className="flex mt3">
              <button type="submit" className="pointer mr2 btn btn-primary" style={{ backgroundColor: "#128b53", borderColor: "#128b53" }}>
                Login
              </button>
              <Link to="/signup" className="ml1 no-underline text-white">
                need to create an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
