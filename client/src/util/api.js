const axios = require("axios");
const { API_URL } = require("./config/config");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//Auth
const register = (user) => api.post("/user/register", user);
const login = (user) => api.post("/user/auth", user);
const logout = () => api.delete("/auth");

//Bets
const getBets = () => api.get("/bet");
const getBet = (id) => api.get(`/bet/${id}`);
const createBet = (bet) => api.post("/bet", bet);
const updateBet = (id, bet) => api.put(`/bet/${id}`, bet);
const deleteBet = (id) => api.delete(`/bet/${id}`);

module.exports = {
  register,
  login,
  logout,
  getBets,
  getBet,
  createBet,
  updateBet,
  deleteBet,
};
