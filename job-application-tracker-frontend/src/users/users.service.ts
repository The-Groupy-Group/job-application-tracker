// src/services/authService.ts
import axios from "axios";

const API_URL = "https://reqres.in/api";

class UsersService {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password });

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
}

export default new UsersService();
