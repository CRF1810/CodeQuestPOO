const dsf_5 = [
  {
    titulo: "Fase 1 – O Golpe do Guerreiro",

    initialCode: "# Sobrescreve o método atacar()\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome) e o método atacar()" },
      { label: "Definir a classe Guerreiro que herda de Heroi" },
      { label: "Sobrescrever atacar() no Guerreiro (mesmo nome, novo comportamento)" },
      { label: "Criar o guerreiro 'Kael' e chamar atacar()" },
      { label: "Mostrar: Kael golpeou com a espada!" },
    ],

    validate: (output) =>
      output.trim() === "Kael golpeou com a espada!",

    hints: {
      error: "Escreve uma nova versão de atacar() dentro da classe Guerreiro: o Python usa sempre a versão da classe filha.",
      success: "Boa! O Guerreiro tem agora um comportamento próprio ⚔️",
    },
  },

  {
    titulo: "Fase 2 – O Feitiço da Maga",

    initialCode: "# Cria um comportamento próprio para o Mago\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome) e o método atacar()" },
      { label: "Definir a classe Mago que herda de Heroi" },
      { label: "Sobrescrever atacar() no Mago" },
      { label: "Criar a maga 'Elyra' e chamar atacar()" },
      { label: "Mostrar: Elyra lançou uma bola de fogo!" },
    ],

    validate: (output) =>
      output.trim() === "Elyra lançou uma bola de fogo!",

    hints: {
      error: "A classe Mago precisa da sua própria versão de atacar(), que use self.nome.",
      success: "Excelente! O mesmo método pode ter um comportamento completamente diferente 🔥",
    },
  },

  {
    titulo: "Fase 3 – Habilidades Únicas",

    initialCode: "# Dá uma habilidade diferente a cada classe\n",

    objectives: [
      { label: "Definir Heroi com __init__(self, nome) e um método habilidade()" },
      { label: "Definir Guerreiro e Mago, ambas a herdar de Heroi" },
      { label: "Sobrescrever habilidade() em cada classe filha" },
      { label: "Criar 'Kael' (Guerreiro) e 'Elyra' (Mago) e chamar habilidade() de cada um" },
      { label: "Mostrar: Kael usa Golpe Poderoso! e Elyra usa Raio Arcano!, em linhas separadas" },
    ],

    validate: (output) =>
      output.trim() === "Kael usa Golpe Poderoso!\nElyra usa Raio Arcano!",

    hints: {
      error: "Cada classe filha redefine habilidade() com a sua própria mensagem, usando self.nome.",
      success: "Fantástico! Cada tipo de herói tem agora uma identidade própria ✨",
    },
  },

];

export default dsf_5;
