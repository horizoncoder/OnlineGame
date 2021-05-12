import axios from "axios";
import { AUTH_URL } from "../components/api";

class AuthService {
  login(username, password,id) {
    return axios
      .post(`${AUTH_URL}signin`, {
        username,
        password,
        id
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(`${AUTH_URL}signup`, {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
