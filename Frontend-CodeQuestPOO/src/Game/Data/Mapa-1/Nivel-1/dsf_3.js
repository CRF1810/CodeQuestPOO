const dsf_3 = [
  {
    titulo: "Fase 1 – Soma Simples",
    initialCode: "# Soma dois números\n",
    objectives: [
      { label: "Criar duas variáveis com números 10 e 5" },
      { label: "Somar os valores" },
      { label: "Mostrar o resultado com print()" },
    ],
    validate: (output, code) => {
      if (output.trim() !== "15" || typeof code !== "string") return false

      const executableLines = code
        .split("\n")
        .map(line => line.replace(/#.*/, "").trim())
        .filter(Boolean)
      const assignments = executableLines
        .map(line => line.match(/^([A-Za-z_]\w*)\s*=\s*(-?\d+)\s*$/))
        .filter(Boolean)
      const tenVariable = assignments.find(([, , value]) => Number(value) === 10)?.[1]
      const fiveVariable = assignments.find(([, , value]) => Number(value) === 5)?.[1]

      if (!tenVariable || !fiveVariable || tenVariable === fiveVariable) return false

      const escapedTen = tenVariable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const escapedFive = fiveVariable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const printsSum = executableLines.some(line =>
        new RegExp(`^print\\s*\\(\\s*(?:${escapedTen}\\s*\\+\\s*${escapedFive}|${escapedFive}\\s*\\+\\s*${escapedTen})\\s*\\)\\s*$`).test(line)
      )

      return printsSum
    },
    hints: {
      error: "Lembra-te: a soma em Python se faz com +",
      success: "Boa! Somaste corretamente 🎉"
    }
  },
  {
    titulo: "Fase 2 – Multiplicação",
    initialCode: "# Multiplica valores\n",
    objectives: [
      { label: "Criar duas variáveis a e b" },
      { label: "Multiplicar os valores e o resultado tem que ser 50" },
      { label: "Mostrar o resultado com print()" },
    ],
    validate: (output, code) => {
      if (output.trim() !== "50" || typeof code !== "string") return false

      // Exige as variáveis da atividade e que print mostre o produto delas.
      const executableLines = code
        .split("\n")
        .map(line => line.replace(/#.*/, "").trim())
        .filter(Boolean)
      const hasA = executableLines.some(line => /^a\s*=/.test(line))
      const hasB = executableLines.some(line => /^b\s*=/.test(line))
      const printsProduct = executableLines.some(line =>
        /^print\s*\(\s*(?:a\s*\*\s*b|b\s*\*\s*a)\s*\)\s*$/.test(line)
      )

      return hasA && hasB && printsProduct
    },
    hints: {
      error: "Lembra-te: a multiplicação em Python usa *",
      success: "Boa! Multiplicaste corretamente 🎉"
    }
  },
  {
    titulo: "Fase 3 – Comparação",
    initialCode: "# Compara dois valores\n",
    objectives: [
      { label: "Criar duas variáveis a e b" },
      { label: "Comparar usando > ou ==" },
      { label: "Mostrar True" },
    ],
    validate: (output) => output.trim() === "True",
    hints: {
      error: "Algo não está correto na comparação. Verifica se estás a usar > ou == corretamente.",
      success: "Boa! Comparaste corretamente 🎉"
    }
  },
]

export default dsf_3
