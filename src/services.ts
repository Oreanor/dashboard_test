import { BASE_API_URL } from "./consts.ts";
import {
  IListUsersResponse,
  ILogInResponse,
  IRegisterResponse,
  IUser,
  IUserResponse,
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

const token = sessionStorage.getItem("token");

export const getUsers = async (page: number): Promise<IListUsersResponse> => {
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
  const res = await fetch(BASE_API_URL + `/api/users/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resJSON = await res.json();
  return resJSON;
};

export const deleteUser = async (id: number) => {
  await fetch(BASE_API_URL + `/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = async (userData: IUser) => {
  const params = makeParams(userData);
  await fetch(BASE_API_URL + "/api/users", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: params,
  });
};

export const updateUser = async (userData: IUser) => {
  const params = makeParams(userData);
  await fetch(BASE_API_URL + `/api/users/${userData.id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: params,
  });
};

const makeParams = (userData: IUser): URLSearchParams => {
  const params = new URLSearchParams();
  params.append("email", userData.email);
  params.append("first_name", userData.first_name);
  params.append("last_name", userData.last_name);
  return params;
};
