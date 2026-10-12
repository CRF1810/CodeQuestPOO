const dsf_2 = [
  {
    titulo: "Fase 1 – A Primeira Casa",
    initialCode: "# Define a classe Casa (um molde ainda vazio)\n",
    objectives: [
      { label: "Definir uma classe chamada Casa" },
      { label: "Usar pass no corpo da classe (a classe ainda está vazia)" },
      { label: "Fora da classe, usar print() para mostrar: Molde criado" },
    ],
    validate: (output) => output.trim() === "Molde criado",
    hints: {
      error: "Uma classe define-se com class Casa: e o corpo fica indentado. Usa pass enquanto estiver vazia e mostra a mensagem com print().",
      success: "Boa! Definiste o primeiro molde da vila 🎉",
    },
  },
  {
    titulo: "Fase 2 – Molde do Habitante",
    initialCode: "# Define a classe Habitante (um molde ainda vazio)\n",
    objectives: [
      { label: "Definir uma classe chamada Habitante" },
      { label: "Usar pass no corpo da classe" },
      { label: "Fora da classe, usar print() para mostrar: Habitante preparado" },
    ],
    validate: (output) => output.trim() === "Habitante preparado",
    hints: {
      error: "Verifica se o nome da classe é Habitante (com maiúscula inicial) e se usaste print() fora da classe.",
      success: "Excelente! A vila já tem um molde para habitantes 🏘️",
    },
  },
  {
    titulo: "Fase 3 – Molde do Lobo",
    initialCode: "# Define a classe Lobo (um molde ainda vazio)\n",
    objectives: [
      { label: "Definir uma classe chamada Lobo" },
      { label: "Usar pass no corpo da classe" },
      { label: "Fora da classe, usar print() para mostrar: Lobo preparado" },
    ],
    validate: (output) => output.trim() === "Lobo preparado",
    hints: {
      error: "A classe deve chamar-se Lobo. Depois mostra a mensagem com print(), sem a indentar.",
      success: "Boa! Definiste o molde do futuro boss da vila 🐺",
    },
  },
];

export default dsf_2;
