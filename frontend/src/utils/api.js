import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getTransactions = () => API.get("/transactions");
export const addTransaction = (data) => API.post("/transactions", data);
export const getRecommendations = () => API.get("/transactions/recommendations");
