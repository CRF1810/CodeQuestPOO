const dsf_5 = [
  {
    titulo: "Fase 1 – O Golpe do Guerreiro",

    initialCode: "# Sobrescreve o método atacar()\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Criar o método atacar()" },
      { label: "Criar a classe Guerreiro" },
      { label: "Sobrescrever atacar()" },
      { label: "Mostrar: Kael golpeou com a espada!" },
    ],

    validate: (output) =>
      output.trim() === "Kael golpeou com a espada!",

    hints: {
      error: "Cria uma nova versão de atacar() dentro da classe Guerreiro.",
      success: "Boa! O Guerreiro tem agora uma voz própria ⚔️",
    },
  },

  {
    titulo: "Fase 2 – O Feitiço da Maga",

    initialCode: "# Cria um comportamento próprio para a Maga\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Criar a classe Maga" },
      { label: "Fazer Maga herdar de Heroi" },
      { label: "Sobrescrever o método atacar()" },
      { label: "Mostrar: Elyra lançou uma bola de fogo!" },
    ],

    validate: (output) =>
      output.trim() === "Elyra lançou uma bola de fogo!",

    hints: {
      error: "A classe Maga precisa da sua própria implementação de atacar().",
      success: "Excelente! A mesma acção pode ter um comportamento completamente diferente 🔥",
    },
  },

  {
    titulo: "Fase 3 – Habilidades Únicas",

    initialCode: "# Dá uma habilidade diferente a cada classe\n",

    objectives: [
      { label: "Criar Heroi, Guerreiro e Mago" },
      { label: "Criar o método habilidade()" },
      { label: "Sobrescrever habilidade() nas classes filhas" },
      { label: "Dar uma habilidade própria a cada personagem" },
      { label: "Mostrar as duas habilidades" },
    ],

    validate: (output) =>
      output.trim() === "Kael usa Golpe Poderoso!\nElyra usa Raio Arcano!",

    hints: {
      error: "Cada classe filha deve redefinir habilidade() com a sua própria mensagem.",
      success: "Fantástico! Cada tipo de herói tem agora uma identidade própria ✨",
    },
  },

];

export default dsf_5;