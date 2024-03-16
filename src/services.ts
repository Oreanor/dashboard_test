import { BASE_API_URL } from "./consts.ts";
import {
  ILogInResponse,
  IRegisterResponse,
  IUserResponse,
  IListUsersResponse,
} from "./interfaces.ts";

export const logIn = async (
  login: string,
  password: string
): Promise<ILogInResponse> => {
  const res = await fetch(BASE_API_URL + "/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: login, password: password }),
  });
  const resJSON = await res.json();
  return resJSON;
};

export const register = async (
  login: string,
  password: string
): Promise<IRegisterResponse> => {
  const res = await fetch(BASE_API_URL + "/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: login, password: password }),
  });
  const resJSON = await res.json();
  return resJSON;
};

export const getUsers = async (page: number): Promise<IListUsersResponse> => {
  const token = sessionStorage.getItem("token");
  const params = new URLSearchParams({
    page: page.toString(),
  });
  const res = await fetch(BASE_API_URL + `/api/users?${params}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resJSON = await res.json();
  return resJSON;
};

export const getUserByID = async (id: string): Promise<IUserResponse> => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(BASE_API_URL + `/api/users/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resJSON = await res.json();
  return resJSON;
};
