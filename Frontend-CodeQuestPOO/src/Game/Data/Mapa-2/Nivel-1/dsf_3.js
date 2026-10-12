const dsf_3 = [
  {
    titulo: "Fase 1 – Criar um Habitante",
    initialCode: "# Define a classe Habitante e cria um objeto a partir dela\n",
    objectives: [
      { label: "Definir a classe Habitante (com pass)" },
      { label: "Criar um objeto a partir da classe: aldeao = Habitante()" },
      { label: "Mostrar: Objeto criado" },
    ],
    validate: (output) => output.trim() === "Objeto criado",
    hints: {
      error: "Um objeto (ou instância) cria-se chamando a classe com parênteses: aldeao = Habitante().",
      success: "Boa! Criaste a tua primeira instância 🎉",
    },
  },
  {
    titulo: "Fase 2 – Criar uma Casa",
    initialCode: "# Define a classe Casa e cria um objeto a partir dela\n",
    objectives: [
      { label: "Definir a classe Casa (com pass)" },
      { label: "Criar um objeto chamado casa_azul a partir da classe" },
      { label: "Mostrar: Casa criada" },
    ],
    validate: (output) => output.trim() === "Casa criada",
    hints: {
      error: "Lembra-te: casa_azul = Casa() cria um objeto da classe Casa.",
      success: "Muito bem! A Vila da Lógica ganhou uma nova casa 🏠",
    },
  },
  {
    titulo: "Fase 3 – Criar o Lobo",
    initialCode: "# Define a classe Lobo e cria uma instância dela\n",
    objectives: [
      { label: "Definir a classe Lobo (com pass)" },
      { label: "Criar um objeto chamado boss a partir da classe" },
      { label: "Mostrar: Boss criado" },
    ],
    validate: (output) => output.trim() === "Boss criado",
    hints: {
      error: "Define a classe Lobo e depois cria o objeto com boss = Lobo().",
      success: "Boa! O Lobo Guardião entrou no jogo 🐺",
    },
  },
];

export default dsf_3;
