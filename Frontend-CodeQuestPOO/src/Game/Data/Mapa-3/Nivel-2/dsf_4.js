const dsf_4 = [
  {
    titulo: "Fase 1 – A Linhagem dos Heróis",

    initialCode: "# Cria uma classe Guerreiro que herda de Heroi\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome) e guardar self.nome" },
      { label: "Definir a classe Guerreiro que herda de Heroi: class Guerreiro(Heroi)" },
      { label: "Não repetir o __init__: o Guerreiro reutiliza o da classe base" },
      { label: "Criar um guerreiro chamado 'Borin'" },
      { label: "Mostrar, usando o atributo herdado: Borin pertence à linhagem dos heróis" },
    ],

    validate: (output) =>
      output.trim() === "Borin pertence à linhagem dos heróis",

    hints: {
      error: "A classe filha escreve-se entre parênteses: class Guerreiro(Heroi). O atributo nome é herdado.",
      success: "Muito bem! Criaste a tua primeira relação de herança 🧬",
    },
  },

  {
    titulo: "Fase 2 – O Poder da Classe Base",

    initialCode: "# Usa super() para inicializar a classe base\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome)" },
      { label: "Definir a classe Arqueiro que herda de Heroi" },
      { label: "Criar __init__(self, nome, flechas) no Arqueiro e chamar super().__init__(nome)" },
      { label: "Guardar self.flechas na classe Arqueiro" },
      { label: "Criar 'Sira' com 20 flechas e mostrar: Sira tem 20 flechas" },
    ],

    validate: (output) =>
      output.trim() === "Sira tem 20 flechas",

    hints: {
      error: "super().__init__(nome) inicializa a parte herdada do objeto. Depois acrescenta o atributo flechas.",
      success: "Excelente! O construtor da classe filha reutiliza o da classe base 🏹",
    },
  },

  {
    titulo: "Fase 3 – Classes com Especialização",

    initialCode: "# Cria diferentes tipos de heróis a partir da mesma classe base\n",

    objectives: [
      { label: "Definir a classe Heroi com __init__(self, nome)" },
      { label: "Definir Guerreiro e Mago, ambas a herdar de Heroi" },
      { label: "Guerreiro: acrescentar o atributo arma, com o valor 'Espada'" },
      { label: "Mago: acrescentar o atributo instrumento, com o valor 'Cajado'" },
      { label: "Criar 'Kael' (Guerreiro) e 'Elyra' (Mago) e mostrar: Kael usa Espada e Elyra usa Cajado, em linhas separadas" },
    ],

    validate: (output) =>
      output.trim() === "Kael usa Espada\nElyra usa Cajado",

    hints: {
      error: "Cada classe filha usa super().__init__(nome) e acrescenta o seu atributo específico.",
      success: "Muito bem! A herança permite reutilizar código e acrescentar novas características 🧙",
    },
  },

];

export default dsf_4;
