import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from '../constants';

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
    <div>
      <h4 className="mv3">Login</h4>
      <form onSubmit={handleFormSubmit}>
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
            Login
          </button>
          <Link to="/signup" className="ml1 no-underline black">
            need to create an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
