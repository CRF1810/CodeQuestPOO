const dsf_7 = [ 
  { 
    titulo: "Confronto Final – O Dragão do Caos", 
 
    initialCode: `# O Dragão do Caos ameaça o reino! 
# Cria o teu sistema de batalha aqui. 
 
`, 
 
    objectives: [ 
      { label: "Criar a classe Personagem" }, 
      { label: "Criar as classes Guerreiro, Mago e Arqueiro" }, 
      { label: "Utilizar herança entre as classes" }, 
      { label: "Criar e utilizar atributos nos personagens" }, 
      { label: "Criar o método atacar()" }, 
      { label: "Sobrescrever atacar() nas classes filhas" }, 
      { label: "Criar uma lista com diferentes personagens" }, 
      { label: "Percorrer a lista e utilizar polimorfismo" }, 
      { label: "Criar o Dragão do Caos" }, 
      { label: "Fazer os personagens interagir com o Dragão" }, 
      { label: "Apresentar o resultado da batalha" }, 
    ], 
 
    validate: (output) => 
      output.trim() === 
      "Kael golpeou com a espada!\nSira disparou uma flecha!\nElyra lançou um feitiço!\nO Dragão do Caos foi derrotado!", 
 
    hints: { 
      error: 
        "Começa pela classe Personagem. Depois cria as classes Guerreiro, Arqueiro e Mago através de herança e dá a cada uma o seu próprio comportamento.", 
 
      success: 
        "🏆 O Dragão do Caos foi derrotado! Completaste o desafio final e demonstraste que sabes aplicar POO na prática.", 
    }, 
  }, 
]; 
 
export default dsf_7; 