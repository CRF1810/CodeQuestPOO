const dsf_2 = [
  {
    titulo: "Fase 1 – O Golpe do Goblin",

    initialCode: "# Cria o método receber_dano()\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome, vida)" },
      { label: "Criar o herói 'João' com 100 de vida" },
      { label: "Criar o método receber_dano(self, dano), que reduz self.vida" },
      { label: "Chamar receber_dano(25)" },
      { label: "Mostrar: João ficou com 75 de vida" },
    ],

    validate: (output) =>
      output.trim() === "João ficou com 75 de vida",

    hints: {
      error: "O método deve alterar self.vida, subtraindo o dano recebido. Mostra a vida depois de o chamar.",
      success: "O estado do herói mudou depois do ataque 💥",
    },
  },

  {
    titulo: "Fase 2 – A Poção de Cura",

    initialCode: "# Cria o método beber_pocao()\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome, vida)" },
      { label: "Criar a heroína 'Mira' com 50 de vida" },
      { label: "Criar o método beber_pocao(self), que aumenta self.vida em 40" },
      { label: "Chamar beber_pocao()" },
      { label: "Mostrar: Mira recuperou vida e ficou com 90" },
    ],

    validate: (output) =>
      output.trim() === "Mira recuperou vida e ficou com 90",

    hints: {
      error: "Dentro do método, soma 40 a self.vida e mostra o novo valor.",
      success: "A poção funcionou! 🧪 O método alterou o estado do objeto.",
    },
  },

  {
    titulo: "Fase 3 – O Limite da Vida",

    initialCode: "# Cria um método curar() que respeite a vida máxima\n",

    objectives: [
      { label: "Definir a classe Heroi com nome, vida e vida_maxima" },
      { label: "Criar o herói 'Tarek' com 80 de vida e 100 de vida máxima" },
      { label: "Criar o método curar(self, valor), que soma valor a self.vida" },
      { label: "Impedir que a vida ultrapasse self.vida_maxima" },
      { label: "Chamar curar(30) e mostrar: Tarek tem 100 de vida" },
    ],

    validate: (output) =>
      output.trim() === "Tarek tem 100 de vida",

    hints: {
      error: "Depois de curar, se a vida for superior à vida máxima, volta a defini-la como vida máxima (podes usar if ou min()).",
      success: "Excelente! O método já aplica uma regra ao estado do herói 🛡️",
    },
  },

];

export default dsf_2;
