const dsf_8 = [
  {
    titulo: "Boss 1 – O Estábulo Real",
    initialCode: "# Cria cavalos do reino\n",
    objectives: [
      { label: "Definir a classe Cavalo com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar dois objetos: cavalo1 'Trovão' e cavalo2 'Faísca'" },
      { label: "Mostrar o nome de cada cavalo, em linhas separadas" },
    ],
    validate: (output) =>
      output.trim() === "Trovão\nFaísca",
    hints: {
      error: "Cria dois objetos diferentes da classe Cavalo e mostra o atributo nome de cada um.",
      success: "Os cavalos estão prontos para a viagem 🐎",
    },
  },

  {
    titulo: "Boss 2 – Torre dos Magos",
    initialCode: "# Cria um mago que lança feitiços\n",
    objectives: [
      { label: "Definir a classe Mago com __init__(self, nome)" },
      { label: "Guardar o nome em self.nome" },
      { label: "Criar o método lancar_feitico(self), que mostra: <nome> lançou um feitiço!" },
      { label: "Criar o mago 'Merlin' e chamar o método lancar_feitico()" },
    ],
    validate: (output) =>
      output.trim() === "Merlin lançou um feitiço!",
    hints: {
      error: "Usa self.nome dentro do método e chama-o no objeto: mago.lancar_feitico().",
      success: "A magia foi dominada ✨",
    },
  },

  {
    titulo: "Boss 3 – Frota dos Céus",
    initialCode: "# Controla os dirigíveis da cidade\n",
    objectives: [
      { label: "Definir a classe Dirigivel com __init__(self, nome, altitude)" },
      { label: "Guardar os valores em self.nome e self.altitude" },
      { label: "Criar dois objetos: 'Águia' com altitude 100 e 'Falcão' com altitude 200" },
      { label: "Mostrar cada dirigível no formato <nome> - <altitude>, em linhas separadas" },
    ],
    validate: (output) =>
      output.trim() ===
      "Águia - 100\nFalcão - 200",
    hints: {
      error: "Cada objeto guarda dois atributos: nome e altitude. Junta-os na mensagem, por exemplo com uma f-string.",
      success: "A frota está pronta para levantar voo 🚀",
    },
  },

  {
    titulo: "Boss Final – O Dragão Ancestral",
    initialCode: "# Junta tudo o que aprendeste: classe, atributos e métodos\n",
    objectives: [
      { label: "Definir a classe Dragao com __init__(self, nome, vida)" },
      { label: "Guardar os valores em self.nome e self.vida" },
      { label: "Criar o método apresentar(self), que mostra: <nome> tem <vida> de vida" },
      { label: "Criar o método cuspir_fogo(self), que mostra: <nome> lançou fogo!" },
      { label: "Criar o dragão 'Ignis' com 500 de vida" },
      { label: "Chamar apresentar() e depois cuspir_fogo()" },
    ],
    validate: (output) =>
      output.trim() ===
      "Ignis tem 500 de vida\nIgnis lançou fogo!",
    hints: {
      error: "Cada método deve usar self.nome (e self.vida, no caso de apresentar). Chama os dois métodos pela ordem pedida.",
      success: "🏆 Derrotaste o Dragão Ancestral e dominaste as bases da POO!",
    },
  },
];

export default dsf_8;
