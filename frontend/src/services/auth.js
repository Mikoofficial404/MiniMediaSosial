import { API } from "../api/index.js";
import { useJwt } from "react-jwt";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/v1/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async ({ fullname, email, password }) => {
  try {
    const { data } = await API.post("/v1/register", {
      fullname,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useDecodeToken = (token) => {
  const { decodeToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: `Token expirado`,
        data: null,
      };
    }
    return {
      success: true,
      message: "Token Valid",
      data: decodeToken,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
      data: null,
    };
  }
};
