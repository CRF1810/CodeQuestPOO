import api from "../api/axios";
import { saveToken, saveUser, clearAuthStorage } from "./authStorage";

export const login = async (email, password) => {
  try {

    const { data } = await api.post("/auth/login", { email, password });

    saveToken(data.token);
    saveUser(data.user);

    return data;
    
  } catch (err) {
    console.error("Erro ao fazer login: ", err)
  }

};

export const logout = async (id) => {
  try {
    if (id === undefined || id === null) return null;
    const { data } = await api.post(`/auth/logout/${id}`);
    return data;
  } catch (err) {
    console.error("[Performance] Erro ao fazer logout:", err);
    return null;
  } finally {
    clearAuthStorage();
  }
};