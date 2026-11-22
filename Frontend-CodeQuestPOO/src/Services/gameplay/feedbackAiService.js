import api from "../api/axios"

export async function pedirFeedbackIA(payload) {
  try {
    const response = await api.post("/feedback-ai", payload)
    const feedback = response.data?.feedback
    if (typeof feedback !== "string" || !feedback.trim()) {
      throw new Error("A API não devolveu feedback.")
    }
    return feedback.trim()
  } catch (error) {
    console.error("Erro ao pedir feedback da IA:", error);
    throw error
  }
}