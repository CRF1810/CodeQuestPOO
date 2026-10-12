const dsf_6 = [
  {
    titulo: "Fase 1 – Dois Habitantes",
    initialCode: "# Cria dois habitantes a partir da mesma classe\n",
    objectives: [
      { label: "Definir a classe Habitante com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar o objeto habitante1 com o nome 'Rui'" },
      { label: "Criar o objeto habitante2 com o nome 'Ana'" },
      { label: "Mostrar o nome de cada um, em linhas separadas: Rui e depois Ana" },
    ],
    validate: (output) =>
      output.trim() === "Rui\nAna",
    hints: {
      error: "Usa a mesma classe para criar dois objetos independentes, cada um com o seu nome.",
      success: "Boa! Uma classe pode criar muitos objetos 🏘️",
    },
  },

  {
    titulo: "Fase 2 – As Casas da Vila",
    initialCode: "# Cria duas casas a partir da mesma classe\n",
    objectives: [
      { label: "Definir a classe Casa com __init__(self, cor)" },
      { label: "Guardar a cor em self.cor" },
      { label: "Criar o objeto casa1 com a cor 'Azul'" },
      { label: "Criar o objeto casa2 com a cor 'Vermelha'" },
      { label: "Mostrar a cor de cada casa, em linhas separadas: Azul e depois Vermelha" },
    ],
    validate: (output) =>
      output.trim() === "Azul\nVermelha",
    hints: {
      error: "Cada objeto guarda a sua própria cor. Mostra casa1.cor e casa2.cor.",
      success: "Excelente! O mesmo molde gera várias casas diferentes 🏠",
    },
  },

  {
    titulo: "Fase 3 – A Alcateia",
    initialCode: "# Cria dois lobos a partir da mesma classe\n",
    objectives: [
      { label: "Definir a classe Lobo com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar o objeto lobo1 com o nome 'Fenrir'" },
      { label: "Criar o objeto lobo2 com o nome 'Skoll'" },
      { label: "Mostrar o nome de cada lobo, em linhas separadas: Fenrir e depois Skoll" },
    ],
    validate: (output) =>
      output.trim() === "Fenrir\nSkoll",
    hints: {
      error: "Cria dois objetos diferentes da classe Lobo e mostra o atributo nome de cada um.",
      success: "A alcateia está formada 🐺🐺",
    },
  },
];

export default dsf_6;
