import { Router } from "express";
import verificarToken, { type AuthRequest } from "../../Middlewares/auth.middleware.js";
import JogadorSessao from "../../Models/Sessoes/sessoes.js";
import ResearchEvent from "../../Models/ResearchEvent/researchEvent.js";
import Desafio from "../../Models/Desafio/desafio.js";

const router = Router();
const EVENT_TYPES = new Set(["execution", "feedback", "hint_request", "challenge_complete", "challenge_failed", "challenge_abandoned"]);

router.post("/sessions", verificarToken, async (req: AuthRequest, res) => {
  try {
    const alunoId = req.alunoId!;
    const inicio = new Date();
    const sessao = await JogadorSessao.create({ aluno_id: alunoId, inicio, fim: null, duracao: 0 });
    res.status(201).json({ sessao_id: sessao.id });
  } catch (error) {
    console.error("Erro ao iniciar sessão de investigação:", error);
    res.status(500).json({ message: "Não foi possível iniciar a sessão" });
  }
});

router.post("/sessions/:sessionId/events", verificarToken, async (req: AuthRequest, res) => {
  try {
    const alunoId = req.alunoId!;
    const sessionId = Number(req.params.sessionId);
    const { event_type, desafio_id } = req.body ?? {};
    const desafioId = Number(desafio_id);
    if (!Number.isInteger(sessionId) || !Number.isInteger(desafioId) || !EVENT_TYPES.has(event_type)) {
      res.status(400).json({ message: "Sessão, desafio ou tipo de evento inválido" });
      return;
    }

    const sessao = await JogadorSessao.findOne({ where: { id: sessionId, aluno_id: alunoId } });
    if (!sessao || sessao.fim) {
      res.status(404).json({ message: "Sessão inexistente ou já terminada" });
      return;
    }
    if (!await Desafio.findByPk(desafioId)) {
      res.status(404).json({ message: "Desafio inexistente" });
      return;
    }

    const body = req.body ?? {};
    const event = await ResearchEvent.create({
      aluno_id: alunoId,
      sessao_id: sessionId,
      desafio_id: desafioId,
      event_type,
      execution_success: typeof body.execution_success === "boolean" ? body.execution_success : null,
      correct_solution: typeof body.correct_solution === "boolean" ? body.correct_solution : null,
      completion_time_ms: Number.isFinite(body.completion_time_ms) ? Math.max(0, Math.round(body.completion_time_ms)) : null,
      score: Number.isFinite(body.score) ? Math.max(0, Math.min(100, Math.round(body.score))) : null,
      tipo_erro_id: Number.isInteger(body.tipo_erro_id) ? body.tipo_erro_id : null,
      tipo_feedback_id: Number.isInteger(body.tipo_feedback_id) ? body.tipo_feedback_id : null,
      feedback_text: typeof body.feedback_text === "string" ? body.feedback_text.slice(0, 2000) : null,
      hint_key: typeof body.hint_key === "string" ? body.hint_key.slice(0, 64) : null,
    });
    res.status(201).json({ event_id: event.id });
  } catch (error) {
    console.error("Erro ao registar evento de investigação:", error);
    res.status(500).json({ message: "Não foi possível registar o evento" });
  }
});

router.post("/sessions/:sessionId/close", verificarToken, async (req: AuthRequest, res) => {
  try {
    const sessionId = Number(req.params.sessionId);
    const sessao = await JogadorSessao.findOne({ where: { id: sessionId, aluno_id: req.alunoId! } });
    if (!sessao) {
      res.status(404).json({ message: "Sessão inexistente" });
      return;
    }
    if (!sessao.fim) {
      const fim = new Date();
      await sessao.update({ fim, duracao: Math.max(0, Math.floor((fim.getTime() - sessao.inicio.getTime()) / 1000)) });
    }
    res.json({ sucesso: true });
  } catch (error) {
    console.error("Erro ao terminar sessão de investigação:", error);
    res.status(500).json({ message: "Não foi possível terminar a sessão" });
  }
});

export default router;
