// services/api.js
import axios from "axios";
import { BASE_URL, PASSWORD, USERNAME } from "../appconfig";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(USERNAME + ":" + PASSWORD)}`,
  },
});

export default api;
