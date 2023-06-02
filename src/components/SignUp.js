import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from '../constants';
import rotatingImage from "./pngwing.com.png";

const SIGNUP_MUTATION = gql`
  mutation CreateUserAuthMutation($username: String!, $password: String!, $email: String!) {
    createUserauth(username: $username, password: $password, email: $email) {
      userAuth {
        username
        email
        password
      }
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: formState.email,
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ createUserauth }) => {
      localStorage.setItem(AUTH_TOKEN, createUserauth.token);
      navigate('/home');
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: "100vh" }}>
      <div>
        <h4 className="mv3 text-white"></h4>
        <img src={rotatingImage} alt="Rotating Image" className="mb-3 rotating-image" />
        <form onSubmit={handleFormSubmit} className="d-flex flex-column">
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Your email address"
            className="mb-3 form-control"
          />
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
