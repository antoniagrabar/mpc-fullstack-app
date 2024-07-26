import { setCookie, deleteCookie } from "cookies-next";

export const setAuthentication = (token: string) => {
  setCookie("token", token);
};

export const logout = () => {
  deleteCookie("token");
};
