const dsf_6 = [
  {
    titulo: "Fase 1 – Reunir o Exército",

    initialCode: "# Cria uma lista com diferentes heróis\n",

    objectives: [
      { label: "Definir Heroi com __init__(self, nome) e as classes Guerreiro, Arqueiro e Mago, que herdam dela" },
      { label: "Criar 'Kael' (Guerreiro), 'Sira' (Arqueiro) e 'Elyra' (Mago)" },
      { label: "Guardar os três objetos na mesma lista" },
      { label: "Percorrer a lista com um ciclo for" },
      { label: "Mostrar o nome de cada herói, em linhas separadas: Kael, Sira e Elyra" },
    ],

    validate: (output) =>
      output.trim() === "Kael\nSira\nElyra",

    hints: {
      error: "Objetos de classes diferentes podem estar na mesma lista. Percorre-a com for heroi in lista.",
      success: "O exército está reunido! 🛡️",
    },
  },

  {
    titulo: "Fase 2 – Todos ao Ataque",

    initialCode: "# Faz todos os heróis atacarem através do mesmo método\n",

    objectives: [
      { label: "Definir Heroi, Guerreiro, Arqueiro e Mago (com herança)" },
      { label: "Implementar atacar() em cada classe filha, com a sua própria mensagem" },
      { label: "Guardar 'Kael', 'Sira' e 'Elyra' numa lista" },
      { label: "Percorrer a lista com um ciclo for" },
      { label: "Chamar heroi.atacar() em cada objeto, sem verificar o tipo" },
    ],

    validate: (output) =>
      output.trim() ===
      "Kael golpeou com a espada!\nSira disparou uma flecha!\nElyra lançou um feitiço!",

    hints: {
      error: "Percorre a lista e chama atacar() diretamente em cada objeto, sem if nem isinstance().",
      success: "É isso! O mesmo método desencadeia comportamentos diferentes (polimorfismo) ⚔️",
    },
  },

  {
    titulo: "Fase 3 – O Último Combate",

    initialCode: "# Comanda o exército contra o Dragão do Caos\n",

    objectives: [
      { label: "Definir Heroi, Guerreiro, Arqueiro e Mago (com herança)" },
      { label: "Dar a cada classe filha o seu próprio método atacar()" },
      { label: "Criar uma lista com 'Kael', 'Sira' e 'Elyra'" },
      { label: "Percorrer a lista e chamar atacar() em cada herói" },
      { label: "No fim do ciclo, mostrar: O Dragão do Caos foi atingido!" },
    ],

    validate: (output) =>
      output.trim() ===
      "Kael golpeou com a espada!\nSira disparou uma flecha!\nElyra lançou um feitiço!\nO Dragão do Caos foi atingido!",

    hints: {
      error: "Usa polimorfismo: percorre a lista e chama o mesmo método atacar() em todos. A mensagem final aparece só depois do ciclo.",
      success: "🏆 Vitória! Usaste polimorfismo para comandar todo o exército!",
    },
  },

];

export default dsf_6;
