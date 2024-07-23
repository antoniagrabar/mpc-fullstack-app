import Cookies from "js-cookie";
import { baseURL } from "@/constants";

export const setCookie = (name: string, value: string) => {
  Cookies.set(name, value, { expires: 1 });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name, { path: "" });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const setAuthentication = (token: string) => {
  setCookie("token", token);
};

export const logout = () => {
  removeCookie("token");
};

export const isUserAuthorized = async () => {
  const token = getCookie("token");
  const tokenObject = {
    token: token,
  };

  if (token) {
    try {
      const response = await fetch(`${baseURL}/auth`, {
        method: "POST",
        body: JSON.stringify(tokenObject),
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
};
