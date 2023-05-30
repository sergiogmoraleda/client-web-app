import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from '../constants';

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
    <div>
      <h4 className="mv3">Sign Up</h4>
      <form onSubmit={handleFormSubmit}>
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
        />
        <div className="flex mt3">
          <button type="submit" className="pointer mr2 button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
