import { setCookie, deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

export const setAuthentication = (token: string) => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 1);

  const expirationDate = currentDate;

  setCookie("token", token, { httpOnly: true, expires: expirationDate });
};

export const logout = () => {
  deleteCookie("token");
};
