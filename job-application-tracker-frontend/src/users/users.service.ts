// src/services/authService.ts
import apiClient from "../shared/api-client";
import { JwtPayLoad } from "../shared/jwt-payload";
import { jwtDecode } from "jwt-decode";
import { CreateUserRequest } from "./models/create-user";

class UsersService {
  async login(email: string, password: string) {
    const response = await apiClient.post(`users/login`, { email, password });

    const token = response.data.accessToken;
    sessionStorage.setItem("token", token);
  }

  async register(request: CreateUserRequest) {
    await apiClient.post(`users`, request);
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  getTokenPayload(): JwtPayLoad {
    const token = this.getToken();

    if (!token) throw new Error("No token found");

    const res: JwtPayLoad = jwtDecode(token);

    return res;
  }

  logout() {
    sessionStorage.removeItem("token");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default new UsersService();
