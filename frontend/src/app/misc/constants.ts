import { environment as e } from "../../environments/environment";

export const endpoints = {
  facebookLogin: `${e.baseUrl}/auth/facebook-login`,
  googleLogin: `${e.baseUrl}/auth/google-login`,
};

export const constants = {
  jwtKey: "jwt",
  patientsRegistryPageSize: 30,
};
