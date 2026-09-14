const dsf_2 = [
  {
    titulo: "Fase 1 – O Golpe do Goblin",

    initialCode: "# Cria o método receber_dano()\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Guardar a vida do herói" },
      { label: "Criar receber_dano()" },
      { label: "Reduzir a vida em 25 pontos" },
      { label: "Mostrar a vida restante" },
    ],

    validate: (output) =>
      output.trim() === "João ficou com 75 de vida",

    hints: {
      error: "O método deve alterar self.vida, retirando 25 pontos.",
      success: "O estado do herói mudou depois do ataque 💥",
    },
  },

  {
    titulo: "Fase 2 – A Poção de Cura",

    initialCode: "# Cria o método beber_pocao()\n",

    objectives: [
      { label: "Criar uma classe Heroi" },
      { label: "Guardar a vida atual" },
      { label: "Criar beber_pocao()" },
      { label: "Recuperar 40 pontos de vida" },
      { label: "Mostrar a nova vida" },
    ],

    validate: (output) =>
      output.trim() === "Mira recuperou vida e ficou com 90",

    hints: {
      error: "Dentro do método, aumenta self.vida em 40.",
      success: "A poção funcionou! 🧪 O método alterou o estado do objeto.",
    },
  },

  {
    titulo: "Fase 3 – O Limite da Vida",

    initialCode: "# Cria um método curar() que respeite a vida máxima\n",

    objectives: [
      { label: "Guardar vida e vida máxima" },
      { label: "Criar o método curar()" },
      { label: "Adicionar 30 pontos de vida" },
      { label: "Impedir que a vida ultrapasse o máximo" },
      { label: "Mostrar: Tarek tem 100 de vida" },
    ],

    validate: (output) =>
      output.trim() === "Tarek tem 100 de vida",

    hints: {
      error: "Depois de curar, compara a vida atual com a vida máxima.",
      success: "Excelente! O método já aplica uma regra ao estado do herói 🛡️",
    },
  },

];

export default dsf_2;