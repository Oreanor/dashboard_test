export interface ILogInResponse {
  token?: string;
  error?: string;
  id?: string;
}

export interface IRegisterResponse {
  token?: string;
  error?: string;
  id?: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ISupport {
  url: string;
  text: string;
}

export interface IUserResponse {
  data: IUser;
  support: ISupport;
}

export interface IListUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
  support: ISupport;
}
