import "./input.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";

export const client = new ApolloClient({
  uri: "https://commentube.onrender.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    "apollo-require-preflight": "true",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>
);
