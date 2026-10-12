const dsf_1 = [
  {
    titulo: "Fase 1 – O Registo do Guerreiro",

    initialCode: "# Define a classe Guerreiro com nome e nível\n",

    objectives: [
      { label: "Definir a classe Guerreiro com __init__(self, nome, nivel)" },
      { label: "Guardar os valores em self.nome e self.nivel" },
      { label: "Criar um guerreiro com o nome 'Simão' e o nível 5" },
      { label: "Mostrar, usando os atributos: Simão é nível 5" },
    ],

    validate: (output) =>
      output.trim() === "Simão é nível 5",

    hints: {
      error: "Guarda nome e nivel no objeto com self e usa esses atributos na mensagem.",
      success: "Muito bem! O guerreiro já possui os seus primeiros dados ⚔️",
    },
  },

  {
    titulo: "Fase 2 – As Características do Herói",

    initialCode: "# Define a classe Heroi com várias características\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome, vida, habilidade)" },
      { label: "Guardar os três valores como atributos do objeto" },
      { label: "Criar a heroína 'Lyra' com 120 de vida e 60 de habilidade" },
      { label: "Mostrar no formato: Lyra: 120 Vida | 60 Habilidade" },
    ],

    validate: (output) =>
      output.trim() === "Lyra: 120 Vida | 60 Habilidade",

    hints: {
      error: "O objeto deve guardar três atributos: nome, vida e habilidade. Junta-os numa f-string com o formato pedido.",
      success: "Excelente! Um objeto pode guardar vários tipos de informação ✨",
    },
  },

  {
    titulo: "Fase 3 – O Arsenal do Aventureiro",

    initialCode: "# Define a classe Aventureiro com nome e arma\n",

    objectives: [
      { label: "Definir a classe Aventureiro com __init__(self, nome, arma)" },
      { label: "Guardar o nome e a arma como atributos" },
      { label: "Criar o método equipar(self, nova_arma), que altera self.arma" },
      { label: "Criar o aventureiro 'Nox' com a arma inicial 'Espada' e chamar equipar('Machado')" },
      { label: "Mostrar, usando os atributos: Nox equipa Machado" },
    ],

    validate: (output) =>
      output.trim() === "Nox equipa Machado",

    hints: {
      error: "O método equipar() deve atribuir a nova arma a self.arma. Mostra o resultado depois de o chamar.",
      success: "Boa! Agora o objeto consegue alterar os seus próprios dados 🪓",
    },
  },

];

export default dsf_1;
