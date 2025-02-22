import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // FastAPI API URL
});

export default axiosInstance;