const dsf_4 = [
  {
    titulo: "Fase 1 – Nome do Habitante",
    initialCode: "# Usa __init__ para guardar o nome de um habitante\n",
    objectives: [
      { label: "Definir a classe Habitante" },
      { label: "Criar o método __init__(self, nome)" },
      { label: "Guardar o parâmetro no atributo self.nome" },
      { label: "Criar o objeto aldeao com o nome 'Ana'" },
      { label: "Mostrar o atributo aldeao.nome (resultado: Ana)" },
    ],
    validate: (output) => output.trim() === "Ana",
    hints: {
      error: "Dentro do __init__, usa self.nome = nome. Depois cria aldeao = Habitante('Ana') e mostra aldeao.nome.",
      success: "Boa! O objeto já guarda o seu próprio nome 🎉",
    },
  },
  {
    titulo: "Fase 2 – Casa com Cor",
    initialCode: "# Cria uma casa com uma cor usando __init__\n",
    objectives: [
      { label: "Definir a classe Casa" },
      { label: "Criar o método __init__(self, cor)" },
      { label: "Guardar o parâmetro no atributo self.cor" },
      { label: "Criar uma casa com a cor 'azul'" },
      { label: "Mostrar o atributo cor da casa (resultado: azul)" },
    ],
    validate: (output) => output.trim() === "azul",
    hints: {
      error: "A cor deve ser guardada com self.cor = cor. Depois mostra casa.cor.",
      success: "Muito bem! A casa azul foi construída 🏠",
    },
  },
  {
    titulo: "Fase 3 – Lobo com Vida",
    initialCode: "# Cria o Lobo Guardião com vida inicial\n",
    objectives: [
      { label: "Definir a classe Lobo" },
      { label: "Criar o método __init__(self, vida)" },
      { label: "Guardar o parâmetro no atributo self.vida" },
      { label: "Criar o objeto boss com 100 de vida" },
      { label: "Mostrar o atributo boss.vida (resultado: 100)" },
    ],
    validate: (output) => output.trim() === "100",
    hints: {
      error: "Cria o objeto com boss = Lobo(100) e mostra boss.vida.",
      success: "Boa! O Lobo Guardião tem a vida definida logo à nascença 🐺",
    },
  },
];

export default dsf_4;
