const dsf_1 = [
  {
    titulo: "Fase 1 – O Registo do Guerreiro",

    initialCode: "# Cria a classe Guerreiro\n",

    objectives: [
      { label: "Criar a classe Guerreiro" },
      { label: "Guardar o nome do personagem" },
      { label: "Guardar o nível do personagem" },
      { label: "Criar um guerreiro chamado Simão, de nível 5" },
      { label: "Mostrar: Simão é nível 5" },
    ],

    validate: (output) =>
      output.trim() === "Simão é nível 5",

    hints: {
      error: "Cria os atributos nome e nivel no objeto e usa-os na mensagem.",
      success: "Muito bem! O guerreiro já possui os seus primeiros dados ⚔️",
    },
  },

  {
    titulo: "Fase 2 – As Características do Herói",

    initialCode: "# Cria uma classe Heroi com várias características\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Guardar nome, vida e habilidade" },
      { label: "Criar um herói chamado Lyra" },
      { label: "Definir 120 de vida e 60 de habilidade" },
      { label: "Mostrar as características do herói" },
    ],

    validate: (output) =>
      output.trim() === "Lyra: 120 Vida | 60 Habilidade",

    hints: {
      error: "O objeto deve guardar três atributos: nome, vida e habilidade.",
      success: "Excelente! Um objeto pode guardar vários tipos de informação ✨",
    },
  },

  {
    titulo: "Fase 3 – O Arsenal do Aventureiro",

    initialCode: "# Cria uma classe Aventureiro\n",

    objectives: [
      { label: "Criar a classe Aventureiro" },
      { label: "Guardar o nome e a arma" },
      { label: "Criar o método equipar()" },
      { label: "Permitir trocar a arma através do método" },
      { label: "Mostrar: Nox equipa Machado" },
    ],

    validate: (output) =>
      output.trim() === "Nox equipa Machado",

    hints: {
      error: "O método equipar() deve alterar o atributo que guarda a arma.",
      success: "Boa! Agora o objeto consegue controlar os seus próprios dados 🪓",
    },
  },

];

export default dsf_1;

