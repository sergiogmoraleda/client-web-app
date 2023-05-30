import React from "react";
import ReactDOM from "react-dom";
import { setContext } from '@apollo/client/link/context';
import "./styles/index.css";
import App from "./components/App";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { AUTH_TOKEN } from './constants';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
// 2
const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/",
});

// 3
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);