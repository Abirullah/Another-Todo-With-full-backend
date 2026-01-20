import axios from "axios";

const API_BASE = "http://localhost:5000/api";
const api = axios.create({ baseURL: API_BASE });


api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("token_exp");
  if (token && exp) {
    const expiry = parseInt(exp, 10);
    if (Date.now() > expiry) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_exp");
      localStorage.removeItem("user");
      throw new axios.Cancel("Token expired");
    }
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export const fetchTodos = async (filter = {}) => {
  const params = {};
  if (filter.status) params.status = filter.status;
  if (filter.priority) params.priority = filter.priority;
  const res = await api.get("/todos", { params });
  return res.data;
};

export const createTodo = async (data) => {
  const res = await api.post("/todos", data);
  return res.data;
};

export const updateTodo = async (id, data) => {
  const res = await api.put(`/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await api.delete(`/todos/${id}`);
    console.log("Delete response:", res.data);
    return res.data;
};

export const getStats = async () => {
  const res = await api.get("/todos/stats");
  return res.data;
};

// Auth endpoints
export const signup = async (payload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

export const verify = async (payload) => {
  const res = await api.post("/auth/verify", payload);
  return res.data;
};

export const signin = async (payload) => {
  const res = await api.post("/auth/signin", payload);
  return res.data;
};

export const startWorking = async () => {
  const res = await api.post("/auth/start");
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await api.put(`/auth/update/${id}`, data);
  return res.data;
};

export default api;
