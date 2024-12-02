import { toaster } from "@/components/ui";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const keycloakConfig = {
  url: "http://auth.solv.world", // Base URL for Keycloak
  realm: "solv-staging", // Realm name
  clientId: "auth_client", // Client ID
  clientSecret: "xOusor4weZk3mZuhSr1fNDaAwhQp4lhc", // Client Secret (only for confidential clients)
};

// export const signIn = async (username: string, password: string) => {
//   const params = new URLSearchParams();
//   params.append("client_id", keycloakConfig.clientId);
//   if (keycloakConfig.clientSecret) {
//     params.append("client_secret", keycloakConfig.clientSecret);
//   }
//   params.append("grant_type", "password");
//   params.append("username", username);
//   params.append("password", password);

//   try {
//     const response = await axios.post(
//       `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     return response.data; // Contains access_token, refresh_token, etc.
//   } catch (error) {
//     if (error instanceof Error) {
//       toaster({
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         text: (error as any).response?.data.error_description || error.message,
//         type: "error",
//       });
//     } else {
//       console.error("An unknown error occurred:", error);
//     }
//     throw error;
//   }
// };

// export const logout = async () => {
//   const params = new URLSearchParams();
//   params.append("client_id", keycloakConfig.clientId);
//   if (keycloakConfig.clientSecret) {
//     params.append("client_secret", keycloakConfig.clientSecret);
//   }
//   params.append(
//     "refresh_token",
//     localStorage.getItem("refreshToken") as string
//   );

//   try {
//     const response = await axios.post(
//       `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`,
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     localStorage.removeItem("accessToken");
//     return response.data; // Contains access_token, refresh_token, etc.
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(
//         "Error obtaining Keycloak token:",
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (error as any).response?.data || error.message
//       );
//     } else {
//       console.error("An unknown error occurred:", error);
//     }
//     throw error;
//   }
// };
export const signIn = async (username: string, password: string) => {
  return {
    access_token: "1",
    refresh_token: "2",
  };
};
export const logout = async () => {
  localStorage.removeItem("accessToken");
  return null;
};

export const getUser = async () => {
  const token = localStorage.getItem("accessToken");
  const { email, name } = jwtDecode(token as string) as {
    email: string;
    name: string;
  };

  return {
    email,
    name,
  };
};
