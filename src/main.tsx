import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./services/AuthContext.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

//Domain and client id is stored as environment variables
const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN || "";
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID || "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      // https://auth0.com/docs/quickstart/spa/react/interactive
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Auth0Provider>
  </StrictMode>
);
