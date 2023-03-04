import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

//User
export const checkAuth = () => api.get("/user/auth");
export const logout = () => api.delete("/user/auth");
export const login = (user) => api.post("/user/auth", user);
export const register = (user) => api.post("/user/register", user);

//Bet
export const getBets = () => api.get("/bet");
export const createBet = (bet) => api.post("/bet", bet);
export const getBet = (id) => api.get(`/bet/getbet/${id}`);
export const placeBet = (id, bet) => api.post(`/bet/placebet/${id}`, bet);

//Leaderboard
export const getLeaderboard = () => api.get("/user/leaderboard");

//Admin
export const updateBet = (id, bet) => api.put(`/admin/bet/${id}`, bet);
export const deleteBet = (id) => api.delete(`/admin/bet/${id}`);
export const updateUser = (id, user) => api.put(`/admin/user/${id}`, user);
export const deleteUser = (id) => api.delete(`/admin/user/${id}`);
