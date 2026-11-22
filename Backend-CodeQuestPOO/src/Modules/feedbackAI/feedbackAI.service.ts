import Groq from "groq-sdk";
import type { FeedbackInput } from "./feedbackAI.types.js";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const FEEDBACK_FALLBACK =
  "Revê o teu código e tenta identificar o erro principal.";

const INSTRUCOES_FEEDBACK: Record<number, string> = {
  1: `
- Diz apenas se está certo ou errado.
- Dá uma dica muito curta.
- Máximo 10 palavras.
  `.trim(),

  2: `
- Indica o erro principal.
- Dá uma dica curta para corrigir.
- Máximo 12 palavras.
  `.trim(),

  3: `
- Dá uma orientação simples para continuar.
- Não expliques demasiado.
- Máximo 15 palavras.
  `.trim(),
};

const NOMES_TIPO_ERRO: Record<number, string> = {
  1: "Sintaxe",
  2: "Lógica",
  3: "Conceito de POO",
  4: "Encapsulamento",
  5: "Herança",
  6: "Polimorfismo",
};

const limitarFeedback = (texto: string): string => {
  const limpo = texto
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (limpo.length <= 80) {
    return limpo;
  }

  return limpo.slice(0, 77).trim() + "...";
};

export const gerarFeedbackIA = async (
  input: FeedbackInput
): Promise<string> => {
  const instrucoes =
    INSTRUCOES_FEEDBACK[input.tipo_feedback_id] ?? INSTRUCOES_FEEDBACK[2];

  const nomeErro = input.tipo_erro_id
    ? NOMES_TIPO_ERRO[input.tipo_erro_id]
    : null;

  const prompt = `
És o mentor de um jogo educativo de Programação Orientada a Objetos.

REGRAS OBRIGATÓRIAS:
- Responde exclusivamente em português de Portugal.
- Nunca uses português do Brasil.
- Responde numa única frase.
- Máximo 15 palavras.
- Sê direto e objetivo.
- Não uses listas.
- Não uses emojis.
- Não escrevas código.
- Não dês a solução completa.
- Trata o aluno por "tu".
- A resposta deve caber num balão de fala pequeno.

INSTRUÇÃO ESPECÍFICA:
${instrucoes}

${nomeErro ? `Categoria do erro: ${nomeErro}` : ""}

Desafio:
${input.titulo ?? "Sem título"}

Objetivos:
${input.objetivos?.join("\n") ?? "Sem objetivos"}

Código do aluno:
${input.codigo ?? "(sem código)"}

Output obtido:
${input.output ?? "(sem output)"}

Erro:
${input.erro ?? "(sem erro)"}
`.trim();

  try {
    const apiKey = process.env.API_KEY_AI;
    if (!apiKey) {
      throw new Error("API_KEY_AI não está configurada.");
    }

    const groq = new Groq({
      apiKey,
      maxRetries: 1,
      timeout: 15_000,
    });
    const response = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 64,
      temperature: 0.3,
    });

    const feedback = response.choices[0]?.message?.content;
    if (!feedback?.trim()) {
      throw new Error("A Groq devolveu uma resposta vazia.");
    }

    return limitarFeedback(feedback);
  } catch (error) {
    console.error(
      "Erro ao gerar feedback IA:",
      error instanceof Error ? error.message : error
    );
    return FEEDBACK_FALLBACK;
  }
};