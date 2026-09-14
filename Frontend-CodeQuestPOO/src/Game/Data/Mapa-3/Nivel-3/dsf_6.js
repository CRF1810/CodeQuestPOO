const dsf_6 = [
  {
    titulo: "Fase 1 – Reunir o Exército",

    initialCode: "# Cria uma lista com diferentes heróis\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Criar Guerreiro, Arqueiro e Mago" },
      { label: "Criar um objeto de cada classe" },
      { label: "Guardar todos os personagens numa lista" },
      { label: "Percorrer a lista para os apresentar" },
    ],

    validate: (output) =>
      output.trim() === "Kael\nSira\nElyra",

    hints: {
      error: "Coloca os diferentes objetos na mesma lista e percorre-a com um ciclo.",
      success: "O exército está reunido! 🛡️",
    },
  },

  {
    titulo: "Fase 2 – Todos ao Ataque",

    initialCode: "# Faz todos os heróis atacar()\n",

    objectives: [
      { label: "Criar diferentes tipos de heróis" },
      { label: "Implementar atacar() em cada classe" },
      { label: "Guardar os heróis numa lista" },
      { label: "Percorrer a lista" },
      { label: "Chamar atacar() sem verificar o tipo" },
    ],

    validate: (output) =>
      output.trim() ===
      "Kael golpeou com a espada!\nSira disparou uma flecha!\nElyra lançou um feitiço!",

    hints: {
      error: "Percorre a lista e chama atacar() directamente em cada objeto.",
      success: "É isso! O mesmo método desencadeia comportamentos diferentes ⚔️",
    },
  },

  {
    titulo: "Fase 3 – O Último Combate",

    initialCode: "# Comanda o exército contra o Dragão do Caos\n",

    objectives: [
      { label: "Criar Guerreiro, Arqueiro e Mago" },
      { label: "Dar a cada classe um método atacar()" },
      { label: "Criar uma lista com todos os heróis" },
      { label: "Percorrer o exército através de um ciclo" },
      { label: "Fazer cada herói executar o seu próprio ataque" },
      { label: "Mostrar o resultado de todo o ataque" },
    ],

    validate: (output) =>
      output.trim() ===
      "Kael golpeou com a espada!\nSira disparou uma flecha!\nElyra lançou um feitiço!\nO Dragão do Caos foi atingido!",

    hints: {
      error: "Usa polimorfismo: percorre a lista e chama o mesmo método atacar() para todos.",
      success: "🏆 Vitória! Acabaste de usar polimorfismo para comandar todo o exército!",
    },
  },

];

export default dsf_6;
