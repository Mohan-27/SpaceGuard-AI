import axios from "axios";

const API = axios.create({
  baseURL: "https://spaceguard-ai.onrender.com",
});

export default API;