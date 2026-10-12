const dsf_5 = [
  {
    titulo: "Fase 1 – Nome e Idade",
    initialCode: "# Guarda o nome e a idade num objeto\n",
    objectives: [
      { label: "Definir a classe Habitante" },
      { label: "Criar o método __init__(self, nome, idade)" },
      { label: "Guardar os valores em self.nome e self.idade" },
      { label: "Criar um habitante com o nome 'Rui' e 12 anos" },
      { label: "Mostrar, usando os atributos: Rui tem 12 anos" },
    ],
    validate: (output) => output.trim() === "Rui tem 12 anos",
    hints: {
      error: "Usa os atributos na mensagem, por exemplo: print(f'{habitante.nome} tem {habitante.idade} anos').",
      success: "Excelente! Um objeto pode guardar vários atributos 🎉",
    },
  },
  {
    titulo: "Fase 2 – Ferramenta da Oficina",
    initialCode: "# Cria uma ferramenta com nome e tipo\n",
    objectives: [
      { label: "Definir a classe Ferramenta" },
      { label: "Criar o método __init__(self, nome, tipo)" },
      { label: "Guardar os valores em self.nome e self.tipo" },
      { label: "Criar a ferramenta com o nome 'Martelo' e o tipo 'construção'" },
      { label: "Mostrar, usando os atributos: Martelo - construção" },
    ],
    validate: (output) => output.trim() === "Martelo - construção",
    hints: {
      error: "Guarda os atributos com self.nome e self.tipo e usa-os no print().",
      success: "Boa! A oficina recebeu uma ferramenta nova 🔨",
    },
  },
  {
    titulo: "Fase 3 – Armadura do Lobo",
    initialCode: "# Guarda os atributos do Lobo de Armadura Negra\n",
    objectives: [
      { label: "Definir a classe Lobo" },
      { label: "Criar o método __init__(self, nome, armadura)" },
      { label: "Guardar os valores em self.nome e self.armadura" },
      { label: "Criar o lobo com o nome 'Fenrir' e a armadura 'negra'" },
      { label: "Mostrar, usando os atributos: Fenrir usa armadura negra" },
    ],
    validate: (output) => output.trim() === "Fenrir usa armadura negra",
    hints: {
      error: "Usa dois atributos: self.nome e self.armadura, e junta-os numa só mensagem.",
      success: "Muito bem! O boss já tem identidade e armadura 🐺",
    },
  },
];

export default dsf_5;
