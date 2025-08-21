
import axios from "axios";

export const api = axios.create({
  baseURL: "https://swapi.py4e.com/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
