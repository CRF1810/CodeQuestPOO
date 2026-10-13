const dsf_1 = {
  titulo: "Variáveis Misteriosas",
  streak: 2,
  perguntas: [
    {
      id: 1,
      texto: "O que é uma variável em programação?",
      hint: "Pensa na variável como uma caixa com um nome onde o programa guarda um valor.",
      opcoes: [
        { id: "a", label: "Um tipo de função" },
        { id: "b", label: "Um espaço para guardar dados" },
        { id: "c", label: "Um erro no código" },
        { id: "d", label: "Um ciclo repetitivo" },
      ],
      correctId: "b",
    },
    {
      id: 2,
      texto: "Como se cria uma variável em Python?",
      hint: "Em Python, uma atribuição usa o nome, um sinal de igual e o valor à direita.",
      opcoes: [
        { id: "a", label: "int x = 10" },
        { id: "b", label: "x := 10" },
        { id: "c", label: "x = 10" },
        { id: "d", label: "let x = 10" },
      ],
      correctId: "c",
    },
    {
      id: 3,
      texto: "Qual destas é uma variável válida?",
      hint: "Um nome de variável pode começar por letra; os números podem vir depois, sem espaços ou hífen.",
      opcoes: [
        { id: "a", label: "nome1" },
        { id: "b", label: "nome-1" },
        { id: "c", label: "nome 1" },
      ],
      correctId: "a",
    },
    {
      id: 4,
      texto: "O que acontece ao escrever x = 5?",
      hint: "O sinal = atribui o valor da direita ao nome que está à esquerda.",
      opcoes: [
        { id: "a", label: "Apaga o programa" },
        { id: "b", label: "Cria uma função" },
        { id: "c", label: "Guarda o valor 5 na variável x" },
        { id: "d", label: "Mostra 5 no ecrã" },
      ],
      correctId: "c",
    },
    {
      id: 5,
      texto: "Qual o valor de x após x = 10?",
      hint: "Substitui x pelo valor que lhe foi atribuído na linha anterior.",
      opcoes: [
        { id: "a", label: "0" },
        { id: "b", label: "10" },
        { id: "c", label: "x" },
        { id: "d", label: "Erro" },
      ],
      correctId: "b",
    },
  ],
}


export default dsf_1
