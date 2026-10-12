const dsf_7 = [
  {
    titulo: "Fase 1 – Apresentação do Habitante",
    initialCode: "# Cria um método apresentar()\n",
    objectives: [
      { label: "Definir a classe Habitante com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar o método apresentar(self), que mostra: Eu sou <nome>" },
      { label: "Criar o habitante 'Rui' e chamar o método apresentar()" },
    ],
    validate: (output) =>
      output.trim() === "Eu sou Rui",
    hints: {
      error: "Um método é uma função dentro da classe. Dentro dele, usa self.nome para aceder ao atributo.",
      success: "Boa! Um método consegue usar os atributos do próprio objeto 🎉",
    },
  },

  {
    titulo: "Fase 2 – Ferramenta Especial",
    initialCode: "# Cria um método descrever()\n",
    objectives: [
      { label: "Definir a classe Ferramenta com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar o método descrever(self), que mostra: Ferramenta: <nome>" },
      { label: "Criar a ferramenta 'Martelo' e chamar o método descrever()" },
    ],
    validate: (output) =>
      output.trim() === "Ferramenta: Martelo",
    hints: {
      error: "O método deve usar self.nome. Chama-o no objeto: ferramenta.descrever().",
      success: "Excelente! O método já lê os dados do objeto 🔨",
    },
  },

  {
    titulo: "Fase 3 – Rugido de Fenrir",
    initialCode: "# Cria um método rugir()\n",
    objectives: [
      { label: "Definir a classe Lobo com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar o método rugir(self), que mostra: <nome> rugiu!" },
      { label: "Criar o lobo 'Fenrir' e chamar o método rugir()" },
    ],
    validate: (output) =>
      output.trim() === "Fenrir rugiu!",
    hints: {
      error: "Dentro do método usa self.nome e, fora da classe, chama lobo.rugir().",
      success: "Fenrir ganhou voz 🐺",
    },
  },
];

export default dsf_7;
