// src/services/authService.ts
import apiClient from "../shared/api-client";

class UsersService {
  async login(email: string, password: string) {
    const response = await apiClient.post(`users/login`, { email, password });

    const token = response.data.token;
    sessionStorage.setItem("token", token);

    return token;
  }
  getToken() {
    return sessionStorage.getItem("token");
  }

  logout() {
    sessionStorage.removeItem("token");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

export default new UsersService();
