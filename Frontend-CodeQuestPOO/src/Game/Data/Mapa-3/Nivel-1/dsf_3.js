const dsf_3 = [

  {
    titulo: "Fase 1 – Dois Aventureiros",

    initialCode: "# Cria um método cumprimentar()\n",

    objectives: [
      { label: "Criar a classe Aventureiro" },
      { label: "Criar dois objetos diferentes" },
      { label: "Guardar o nome de cada aventureiro" },
      { label: "Criar o método cumprimentar()" },
      { label: "Mostrar uma mensagem entre os dois" },
    ],

    validate: (output) =>
      output.trim() === "Luna cumprimentou Daren!",

    hints: {
      error: "O método deve receber o outro aventureiro como parâmetro.",
      success: "Muito bem! Um objeto já consegue interagir com outro 🤝",
    },
  },

  {
    titulo: "Fase 2 – A Poção Partilhada",

    initialCode: "# Cria um método oferecer_pocao()\n",

    objectives: [
      { label: "Criar a classe Heroi" },
      { label: "Guardar o nome e a quantidade de poções" },
      { label: "Criar oferecer_pocao()" },
      { label: "Receber outro herói como parâmetro" },
      { label: "Retirar uma poção ao primeiro herói" },
      { label: "Mostrar: Luna ofereceu uma poção a Daren!" },
    ],

    validate: (output) =>
      output.trim() === "Luna ofereceu uma poção a Daren!",

    hints: {
      error: "O método deve utilizar o objeto recebido para saber quem recebe a poção.",
      success: "Boa! Agora os objetos conseguem afectar o estado uns dos outros 🧪",
    },
  },

  {
    titulo: "Fase 3 – A Batalha em Equipa",

    initialCode: "# Cria um método atacar_em_equipa()\n",

    objectives: [
      { label: "Criar uma classe Heroi" },
      { label: "Guardar nome e poder de ataque" },
      { label: "Receber outro herói no método" },
      { label: "Somar o poder dos dois heróis" },
      { label: "Mostrar o dano total causado" },
    ],

    validate: (output) =>
      output.trim() === "Luna e Daren causaram 50 de dano!",

    hints: {
      error: "Soma o poder do próprio herói com o poder do herói recebido.",
      success: "Excelente! Dois objetos podem combinar os seus dados numa única acção ⚔️",
    },
  },

];

export default dsf_3;