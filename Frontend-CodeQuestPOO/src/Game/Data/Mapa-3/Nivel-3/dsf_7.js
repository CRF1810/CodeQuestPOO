const dsf_7 = [
  {
    titulo: "Confronto Final – O Dragão do Caos",

    initialCode: `# O Dragão do Caos ameaça o reino!
# Aplica tudo o que aprendeste: classes, herança, polimorfismo e interação entre objetos.

`,

    objectives: [
      { label: "Definir a classe base Heroi com __init__(self, nome)" },
      { label: "Criar o método atacar() na classe Heroi" },
      { label: "Definir Guerreiro, Arqueiro e Mago, que herdam de Heroi" },
      { label: "Sobrescrever atacar() em cada classe filha, com a sua própria mensagem" },
      { label: "Criar 'Kael' (Guerreiro), 'Sira' (Arqueiro) e 'Elyra' (Mago)" },
      { label: "Guardar os três heróis numa lista" },
      { label: "Definir a classe Dragao com __init__(self, nome, vida)" },
      { label: "Criar o dragão 'Dragão do Caos' com 3 de vida" },
      { label: "Percorrer a lista: cada herói ataca (polimorfismo) e o dragão perde 1 de vida" },
      { label: "Considerar o dragão derrotado quando a vida chegar a 0" },
      { label: "No fim, mostrar: O Dragão do Caos foi derrotado!" },
    ],

    validate: (output) =>
      output.trim() ===
      "Kael golpeou com a espada!\nSira disparou uma flecha!\nElyra lançou um feitiço!\nO Dragão do Caos foi derrotado!",

    hints: {
      error:
        "Começa pela classe Heroi e cria as classes filhas por herança, cada uma com o seu atacar(). Depois cria o Dragao, percorre a lista de heróis e, no fim, verifica se a vida chegou a 0.",

      success:
        "🏆 O Dragão do Caos foi derrotado! Completaste o desafio final e mostraste que sabes aplicar POO na prática.",
    },
  },
];

export default dsf_7;
