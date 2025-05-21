import jwtDecode from "jwt-decode";
import { verify, sign } from "jsonwebtoken";
import { apiClient } from "./axios";

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  
  try {
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token format:", error);
    return false;
  }
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//   }, timeLeft);
// };

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    apiClient.axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    delete apiClient.axiosInstance.defaults.headers.common.Authorization;
  }
};

export { verify, sign, isValidToken, setSession };
