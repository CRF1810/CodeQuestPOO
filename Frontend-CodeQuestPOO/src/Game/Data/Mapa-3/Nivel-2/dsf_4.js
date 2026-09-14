const dsf_4 = [
  {
    titulo: "Fase 1 – A Linhagem dos Heróis",

    initialCode: "# Cria uma classe Guerreiro que herda de Heroi\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Guardar o nome na classe base" },
      { label: "Criar a classe Guerreiro" },
      { label: "Fazer Guerreiro herdar de Heroi" },
      { label: "Criar um guerreiro chamado Borin" },
      { label: "Mostrar: Borin pertence à linhagem dos heróis" },
    ],

    validate: (output) =>
      output.trim() === "Borin pertence à linhagem dos heróis",

    hints: {
      error: "Guerreiro deve herdar de Heroi e reutilizar o atributo nome.",
      success: "Muito bem! Criaste a tua primeira relação de herança 🧬",
    },
  },

  {
    titulo: "Fase 2 – O Poder da Classe Base",

    initialCode: "# Usa super() para inicializar o herói\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Criar a classe Arqueiro" },
      { label: "Usar super() no construtor" },
      { label: "Adicionar o atributo flechas" },
      { label: "Criar Sira com 20 flechas" },
      { label: "Mostrar: Sira tem 20 flechas" },
    ],

    validate: (output) =>
      output.trim() === "Sira tem 20 flechas",

    hints: {
      error: "Usa super() para inicializar a parte herdada do objeto.",
      success: "Excelente! O construtor da classe filha está a reutilizar a classe base 🏹",
    },
  },

  {
    titulo: "Fase 3 – Classes com Especialização",

    initialCode: "# Cria diferentes tipos de heróis\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Criar Guerreiro e Mago" },
      { label: "Fazer ambas herdarem de Heroi" },
      { label: "Adicionar uma característica própria a cada classe" },
      { label: "Mostrar as características dos dois personagens" },
    ],

    validate: (output) =>
      output.trim() === "Kael usa Espada\nElyra usa Cajado",

    hints: {
      error: "Cada classe filha deve possuir um atributo específico além dos atributos herdados.",
      success: "Muito bem! A herança permite reutilizar código e acrescentar novas características 🧙",
    },
  },

];

export default dsf_4;