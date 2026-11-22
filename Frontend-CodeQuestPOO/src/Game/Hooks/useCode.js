import { useState, useEffect, useRef } from "react"
import { concluirDesafio } from "../../Services/gameplay/xpProgressService"
import { getPyodide } from "../../Python/pyodideEngine"
import formatError from "../../Python/ErrorPyton"
import classifyError from "../../Python/classifyError"
import classifyFeedback from "../../Python/classifyFeedback"
import { pedirFeedbackIA } from "../../Services/gameplay/feedbackAiService"
import { iniciarSessaoInvestigacao, registarEventoInvestigacao, terminarSessaoInvestigacao } from "../../Services/gameplay/researchMetricsService"

export function useCode(fases = [], config = {}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [mentorStatus, setMentorStatus] = useState("idle")
  const [aiFeedback, setAiFeedback] = useState(null)

  const [objectives, setObjectives] = useState([])
  const [finished, setFinished] = useState(false)

  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const [startTime] = useState(() => Date.now())
  const [timeSeconds, setTimeSeconds] = useState(0)

  const [finalResult, setFinalResult] = useState(null)
  const [desempenhoGuardado, setDesempenhoGuardado] = useState(false)
  const [saving, setSaving] = useState(false)

  const currentQuestion = fases[currentIndex]
  const isUltima = currentIndex + 1 >= fases.length
  const currentHint = currentQuestion?.hints || {}

  const [consecutiveWrong, setConsecutiveWrong] = useState(0)
  const [showFailModal, setShowFailModal] = useState(false)

  const [totalWrong, setTotalWrong] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [streakAtual, setStreakAtual] = useState(config.streakInicial ?? 0)
  const [transitioning, setTransitioning] = useState(false)
  const [awaitingContinue, setAwaitingContinue] = useState(false)

  const totalWrongRef = useRef(0)
  const totalAttemptsRef = useRef(0)
  const totalCorrectRef = useRef(0)

  const tipoErroAtualRef = useRef(null)
  const tipoFeedbackAtualRef = useRef(1)
  const feedbackIaAtualRef = useRef(null)
  const researchSessionIdRef = useRef(null)
  const researchSessionPromiseRef = useRef(null)
  const challengeIdRef = useRef(config.desafio_id)
  const totalSubmissionsRef = useRef(0)
  const hintRequestsRef = useRef(0)
  const researchSessionClosedRef = useRef(false)
  const researchSessionEndedRef = useRef(false)

  useEffect(() => {
    challengeIdRef.current = config.desafio_id
  }, [config.desafio_id])

  async function ensureResearchSession() {
    if (researchSessionIdRef.current) return researchSessionIdRef.current
    if (!config.token || !config.desafio_id) return null
    if (!researchSessionPromiseRef.current) {
      researchSessionPromiseRef.current = iniciarSessaoInvestigacao()
        .then((id) => {
          researchSessionIdRef.current = id
          return id
        })
        .catch((error) => {
          researchSessionPromiseRef.current = null
          console.error("Não foi possível iniciar a sessão de métricas:", error)
          return null
        })
    }
    return researchSessionPromiseRef.current
  }

  async function recordResearchEvent(event) {
    try {
      const sessionId = await ensureResearchSession()
      if (!sessionId) return
      await registarEventoInvestigacao(sessionId, { desafio_id: config.desafio_id, ...event })
    } catch (error) {
      console.error("Não foi possível guardar a métrica do exercício:", error)
    }
  }

  async function requestHint() {
    const hint = currentHint.start
    if (!hint) return
    hintRequestsRef.current += 1
    addLog("info", `💡 ${hint}`)
    await recordResearchEvent({ event_type: "hint_request", hint_key: "start" })
  }

  useEffect(() => {
    if (!currentQuestion) return

    setObjectives(
      currentQuestion.objectives?.map(obj => ({ ...obj, done: false })) ?? []
    )

    setLogs([])
    setMentorStatus("idle")
    setAiFeedback(null)
    setConsecutiveWrong(0)
    setShowFailModal(false)
    setWrong(0)
    setAttempts(0)
    setAwaitingContinue(false)
    setTransitioning(false)

    totalAttemptsRef.current = 0

  }, [currentIndex])

  useEffect(() => {
    if (finished || showFailModal) return

    const t = setInterval(() => {
      setTimeSeconds(Math.floor((Date.now() - startTime) / 1000))
    }, 3000)

    return () => clearInterval(t)
  }, [finished, showFailModal, startTime])

  useEffect(() => {
    if (!showFailModal) return
    researchSessionEndedRef.current = true
    void recordResearchEvent({
      event_type: "challenge_failed",
      completion_time_ms: Date.now() - startTime,
      correct_solution: false,
      score: totalSubmissionsRef.current
        ? Math.round((totalCorrectRef.current / totalSubmissionsRef.current) * 100)
        : 0,
    }).then(async () => {
      const sessionId = researchSessionIdRef.current
      if (!sessionId || researchSessionClosedRef.current) return
      try { await terminarSessaoInvestigacao(sessionId) }
      catch (error) { console.error("Não foi possível terminar a sessão de métricas:", error) }
      finally { researchSessionClosedRef.current = true }
    })
  }, [showFailModal])

  useEffect(() => () => {
    void (async () => {
      let sessionId = researchSessionIdRef.current
      if (!sessionId && researchSessionPromiseRef.current) {
        sessionId = await researchSessionPromiseRef.current
      }
      if (!sessionId || researchSessionClosedRef.current || researchSessionEndedRef.current) return
      try {
        await registarEventoInvestigacao(sessionId, {
          desafio_id: challengeIdRef.current,
          event_type: "challenge_abandoned",
          completion_time_ms: Date.now() - startTime,
          score: totalSubmissionsRef.current
            ? Math.round((totalCorrectRef.current / totalSubmissionsRef.current) * 100)
            : 0,
        })
        await terminarSessaoInvestigacao(sessionId)
      } catch (error) {
        console.error("Não foi possível fechar a sessão interrompida:", error)
      } finally {
        researchSessionClosedRef.current = true
      }
    })()
  }, [])

  useEffect(() => {
    if (!finished) return
    if (!config.token || !config.desafio_id) return
    if (desempenhoGuardado) return
    if (showFailModal) return

    setSaving(true)

    const totalTentativas = totalSubmissionsRef.current
    const score =
      totalTentativas > 0
        ? Math.round((totalCorrectRef.current / totalTentativas) * 100)
        : 0

    console.log("SAVE →", {
      erradas: totalWrongRef.current,
      tentativas: totalSubmissionsRef.current,
      certas: totalCorrectRef.current,
      time: timeSeconds,
      streakAtual: streakAtual,
      tipo_erro_id: tipoErroAtualRef.current,
      tipo_feedback_id: tipoFeedbackAtualRef.current,
      feedback_ia: feedbackIaAtualRef.current,
    })

    concluirDesafio(config.desafio_id, {
      respostas_certas: totalCorrectRef.current,
      respostas_erradas: totalWrongRef.current,
      tentativas: totalSubmissionsRef.current,
      tempo_desafio: timeSeconds,
      score,
      ajudas_usadas: hintRequestsRef.current,
      novo_streak: streakAtual,
      tipo_erro_id: tipoErroAtualRef.current,
      tipo_feedback_id: tipoFeedbackAtualRef.current,
      feedback_ia: feedbackIaAtualRef.current,
    })
      .then((resultado) => {
        if (!resultado) return
        researchSessionEndedRef.current = true
        void recordResearchEvent({
          event_type: "challenge_complete",
          completion_time_ms: Date.now() - startTime,
          correct_solution: true,
          score,
        }).then(async () => {
          const sessionId = researchSessionIdRef.current
          if (sessionId && !researchSessionClosedRef.current) {
            try { await terminarSessaoInvestigacao(sessionId) }
            catch (error) { console.error("Não foi possível terminar a sessão de métricas:", error) }
            finally { researchSessionClosedRef.current = true }
          }
        })
        setDesempenhoGuardado(true)
        setFinalResult(resultado)
        console.log("✅ Desafio concluído!", resultado)
      })
      .catch((err) => {
        console.error("Erro ao guardar desempenho", err)
      })
      .finally(() => {
        setSaving(false)
      })
  }, [finished, showFailModal])


  function addLog(type, message) {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { type, message, time }])
  }

  function addErrorLog(message) {
    totalAttemptsRef.current += 1
    totalSubmissionsRef.current += 1

    setWrong(w => w + 1)
    setAttempts(a => a + 1)
    setTotalAttempts(a => a + 1)

    addLog("error", message)

    return totalAttemptsRef.current
  }

  function continueToNextQuestion() {
    setAwaitingContinue(false)
    setTransitioning(false)
    if (isUltima) setFinished(true)
    else setCurrentIndex(i => i + 1)
  }

  async function gerarFeedbackErro({ code, finalOutput, erro, rawError, tentativa }) {
    try {
      const tipoErroId = classifyError(rawError)
      console.log("classifyError result →", classifyError(rawError))
      tipoErroAtualRef.current = tipoErroId

      // Calcula score parcial para determinar tipo de feedback
      const totalAteTentativa = totalSubmissionsRef.current
      const scoreParcial = totalAteTentativa > 0
        ? Math.round((totalCorrectRef.current / totalAteTentativa) * 100)
        : 0
      const tipoFeedbackId = classifyFeedback(scoreParcial, tentativa)
      tipoFeedbackAtualRef.current = tipoFeedbackId

      const feedback = await pedirFeedbackIA({
        titulo: currentQuestion?.title || currentQuestion?.titulo || currentQuestion?.name || "Desafio",
        objetivos:
          currentQuestion?.objectives?.map(obj =>
            obj.label || obj.text || obj.description || obj.title || String(obj)
          ) ?? [],
        codigo: code,
        output: finalOutput ?? "",
        erro: erro ?? "",
        tentativa,
        tipo_erro_id: tipoErroId,
        tipo_feedback_id: tipoFeedbackId,
      })

      feedbackIaAtualRef.current = feedback
      setAiFeedback(feedback)
      if (feedback) {
        await recordResearchEvent({
          event_type: "feedback",
          tipo_erro_id: tipoErroId,
          tipo_feedback_id: tipoFeedbackId,
          feedback_text: feedback,
          score: scoreParcial,
        })
      }
      return feedback
    } catch (err) {
      console.error("Erro ao pedir feedback IA:", err)
      return null
    }
  }

  async function runCode(code) {
    if (code === undefined && awaitingContinue) {
      continueToNextQuestion()
      return { success: true, continued: true }
    }

    if (loading) return

    const executionStartedAt = Date.now()
    let executionDurationMs = 0

    setLoading(true)
    setMentorStatus("typing")
    setAiFeedback(null)

    addLog("info", "🐍 Executando código...")

    try {
      const pyodide = await getPyodide()

      let stdout = ""
      let stderr = ""

      pyodide.setStdout({
        batched: (text) => {
          stdout += text + "\n"
        }
      })

      pyodide.setStderr({
        batched: (text) => {
          stderr += text + "\n"
        }
      })

      await pyodide.runPythonAsync(code)
      executionDurationMs = Date.now() - executionStartedAt

      const output = stdout.trim()
      const error = stderr.trim()
      const finalOutput = error ? formatError(error) : output

      const isValid = currentQuestion?.validate?.(finalOutput, code) ?? false

      console.log({
        output,
        finalOutput,
        isValid,
        consecutiveWrong,
      })

      if (isValid) {
        totalSubmissionsRef.current += 1
        setMentorStatus("success")

        addLog(
          "success",
          currentHint.success || output || "Correto! 🎉"
        )

        setCorrect(c => c + 1)
        totalCorrectRef.current += 1
        const totalScore = Math.round((totalCorrectRef.current / totalSubmissionsRef.current) * 100)
        await recordResearchEvent({
          event_type: "execution",
          execution_success: true,
          correct_solution: true,
          completion_time_ms: executionDurationMs,
          score: totalScore,
        })

        setConsecutiveWrong(0)
        setStreakAtual(s => s + 1)

        setObjectives(prev =>
          prev.map(obj => ({ ...obj, done: true }))
        )

        setAwaitingContinue(true)
        setTransitioning(true)

        return { success: true, output }

      } else {
        setMentorStatus("error")

        const nextAttempts = addErrorLog(
          currentHint.error
            ? `❌ ${currentHint.error}`
            : `❌ ${finalOutput || "Output vazio"}`
        )

        setMentorStatus("typing")

        await gerarFeedbackErro({
          code,
          finalOutput,
          erro: finalOutput,
          rawError: error || finalOutput,
          tentativa: nextAttempts,
        })

        await recordResearchEvent({
          event_type: "execution",
          execution_success: true,
          correct_solution: false,
          completion_time_ms: executionDurationMs,
          score: Math.round((totalCorrectRef.current / totalSubmissionsRef.current) * 100),
          tipo_erro_id: tipoErroAtualRef.current,
        })

        setMentorStatus("error")

        setStreakAtual(0)

        if (totalAttemptsRef.current >= 3) {
          totalWrongRef.current += 1
          setTotalWrong(t => t + 1)

          if (totalWrongRef.current >= 3) {
            setAwaitingContinue(false)
            setShowFailModal(true)
            setTransitioning(false)
            setLoading(false)
            return { success: false, output: finalOutput }
          }

          const skipMessage = "Atingiste 3 tentativas sem acertar. Vamos avançar para o próximo exercício; poderás continuar a aprender nos seguintes."
          addLog("warning", `⚠️ ${skipMessage}`)

          setAwaitingContinue(true)
          setTransitioning(true)
        }

        return {
          success: false,
          output: finalOutput
        }
      }
    } catch (err) {
      executionDurationMs = executionDurationMs || Date.now() - executionStartedAt
      const clean = formatError(err?.message || String(err))
      const tipoErroId = classifyError(err?.message || String(err))
      tipoErroAtualRef.current = tipoErroId

      setMentorStatus("error")

      const nextAttempts = addErrorLog(clean)

      await gerarFeedbackErro({
        code,
        erro: clean,
        rawError: err?.message || String(err),
        tentativa: nextAttempts,
      })

      await recordResearchEvent({
        event_type: "execution",
        execution_success: false,
        correct_solution: false,
        completion_time_ms: executionDurationMs,
        score: Math.round((totalCorrectRef.current / totalSubmissionsRef.current) * 100),
        tipo_erro_id: tipoErroAtualRef.current,
      })

      setStreakAtual(0)

      // 🔥 MESMA LÓGICA DO ELSE
      if (totalAttemptsRef.current >= 3) {
        totalWrongRef.current += 1
        setTotalWrong(t => t + 1)

        if (totalWrongRef.current >= 3) {
          setAwaitingContinue(false)
          setShowFailModal(true)
          setLoading(false)
          return { success: false, message: clean }
        }

        const skipMessage = "Atingiste 3 tentativas sem acertar. Vamos avançar para o próximo exercício; poderás continuar a aprender nos seguintes."
        addLog("warning", `⚠️ ${skipMessage}`)

        setAwaitingContinue(true)
        setTransitioning(true)
      }

      return { success: false, message: clean }
    } finally {
      setLoading(false)
    }
  }

  return {
    currentQuestion,
    currentIndex,
    logs,
    loading,
    mentorStatus,
    aiFeedback,
    objectives,
    finished,
    timeSeconds,
    correct,
    wrong,
    totalWrong,
    totalAttempts,
    attempts,
    finalResult,
    saving,
    addLog,
    runCode,
    requestHint,
    showFailModal,
    streakAtual,
    transitioning,
    awaitingContinue,
    continueToNextQuestion,
  }
}
