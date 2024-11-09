// src/services/authService.ts
import apiClient from "../../shared/api-client";
import { TokenPayload } from "../../shared/models/jwt-payload";
import { jwtDecode } from "jwt-decode";
import { CreateUserRequest } from "../models/create-user-request";
import { AxiosInstance, AxiosResponse } from "axios";

class UsersService {
  constructor(private readonly apiClient: AxiosInstance) {}

  async login(email: string, password: string) {
    const response: AxiosResponse<{ accessToken: string }> =
      await this.apiClient.post(`users/login`, { email, password });

    const token = response.data.accessToken;
    sessionStorage.setItem("token", token);
  }

  async register(request: CreateUserRequest) {
    await apiClient.post(`users`, request);
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  getTokenPayload(): TokenPayload {
    const token = this.getToken();

    if (!token) throw new Error("No token found");

    const res: TokenPayload = jwtDecode(token);

    return res;
  }

  logout() {
    sessionStorage.removeItem("token");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default new UsersService(apiClient);
