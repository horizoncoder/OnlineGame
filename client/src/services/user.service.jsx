import axios from "axios";
import authHeader from "./auth-header";
import { TEST_URL } from "../components/api";

class UserService {
  getPublicContent() {
    return axios.get(`${TEST_URL}all`);
  }

  getUserBoard() {
    return axios.get(`${TEST_URL}user`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(`${TEST_URL}mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`${TEST_URL}admin`, { headers: authHeader() });
  }
}

export default new UserService();
