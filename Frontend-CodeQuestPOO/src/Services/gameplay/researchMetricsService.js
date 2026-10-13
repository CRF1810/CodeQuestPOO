import api from "../api/axios";

export async function iniciarSessaoInvestigacao() {
  const { data } = await api.post("/research/sessions");
  return data.sessao_id;
}

export async function registarEventoInvestigacao(sessaoId, payload) {
  const { data } = await api.post(`/research/sessions/${sessaoId}/events`, payload);
  return data;
}

export async function terminarSessaoInvestigacao(sessaoId) {
  const { data } = await api.post(`/research/sessions/${sessaoId}/close`);
  return data;
}
