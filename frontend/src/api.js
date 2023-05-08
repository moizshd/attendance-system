import axios from "axios";

const instance = axios.create({
  baseURL: "https://ai-attendance-system.herokuapp.com/api", // Replace with your backend server's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
