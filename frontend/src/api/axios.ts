import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // FastAPI API URL
  withCredentials: true,

});

export default axiosInstance;