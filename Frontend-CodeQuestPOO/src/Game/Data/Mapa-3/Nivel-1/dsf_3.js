const dsf_3 = [

  {
    titulo: "Fase 1 – Dois Aventureiros",

    initialCode: "# Cria um método cumprimentar()\n",

    objectives: [
      { label: "Definir a classe Aventureiro com __init__(self, nome)" },
      { label: "Criar dois objetos: 'Luna' e 'Daren'" },
      { label: "Criar o método cumprimentar(self, outro), que recebe outro aventureiro" },
      { label: "Usar self.nome e outro.nome na mensagem" },
      { label: "Fazer a Luna cumprimentar o Daren e mostrar: Luna cumprimentou Daren!" },
    ],

    validate: (output) =>
      output.trim() === "Luna cumprimentou Daren!",

    hints: {
      error: "O método recebe o outro aventureiro como parâmetro: luna.cumprimentar(daren).",
      success: "Muito bem! Um objeto já consegue interagir com outro 🤝",
    },
  },

  {
    titulo: "Fase 2 – A Poção Partilhada",

    initialCode: "# Cria um método oferecer_pocao()\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome, pocoes)" },
      { label: "Criar 'Luna' com 3 poções e 'Daren' com 0 poções" },
      { label: "Criar o método oferecer_pocao(self, outro)" },
      { label: "Retirar uma poção a self e acrescentá-la a outro" },
      { label: "Mostrar: Luna ofereceu uma poção a Daren!" },
    ],

    validate: (output) =>
      output.trim() === "Luna ofereceu uma poção a Daren!",

    hints: {
      error: "O objeto recebido (outro) permite alterar também o estado do segundo herói: outro.pocoes += 1.",
      success: "Boa! Agora os objetos conseguem afetar o estado uns dos outros 🧪",
    },
  },

  {
    titulo: "Fase 3 – A Batalha em Equipa",

    initialCode: "# Cria um método atacar_em_equipa()\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome, poder)" },
      { label: "Criar 'Luna' com poder 30 e 'Daren' com poder 20" },
      { label: "Criar o método atacar_em_equipa(self, outro)" },
      { label: "Somar self.poder e outro.poder" },
      { label: "Mostrar: Luna e Daren causaram 50 de dano!" },
    ],

    validate: (output) =>
      output.trim() === "Luna e Daren causaram 50 de dano!",

    hints: {
      error: "Soma o poder do próprio herói (self.poder) com o do herói recebido (outro.poder).",
      success: "Excelente! Dois objetos podem combinar os seus dados numa única ação ⚔️",
    },
  },

];

export default dsf_3;
