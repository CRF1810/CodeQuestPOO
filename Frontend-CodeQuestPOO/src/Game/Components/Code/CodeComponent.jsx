import CodeBox from "./CodeBox"
import ConsoleBox from "./ConsoleBox"
import Objectives from "./Objectives"
import MentorBox from "./MentorBox"

export default function CodeComponent({
  currentQuestion,
  logs,
  loading,
  mentorStatus,
  aiFeedback,
  objectives,
  runCode,
  addLog,
  hints,
  transitioning,
  onRequestHint,
}) {

  return (

    <div className="relative flex flex-col justify-center items-center h-screen mr-15">

      {transitioning && (
        <div className="absolute inset-10 z-9 flex items-center justify-center">

          <div className="text-center text-white">

            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

            <p className="font-bold text-xl">
              {mentorStatus === "success"
                ? "Resposta correta!"
                : "Atingiste 3 tentativas sem acertar."}
            </p>
            <p className="mt-2 max-w-md text-sm text-gray-300">
              {mentorStatus === "success"
                ? "Lê o feedback com atenção e clica em Continuar quando estiveres pronto."
                : "Atingiste 3 tentativas sem acertar. Clica em Continuar para avançar."}
            </p>
            <button
              type="button"
              onClick={() => runCode()}
              className="mt-5 rounded-full border border-blue-300/40 bg-blue-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Continuar
            </button>

          </div>

        </div>
      )}

      <div
        className={`
          w-full max-w-[41.25rem]
          transition-all duration-300 ease-in-out
          ${transitioning
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100"
          }
        `}
      >

        <CodeBox
          tituloDoDesafio={currentQuestion?.titulo}
          initialCode={currentQuestion?.initialCode}
          onRun={runCode}
          loading={loading || transitioning}
          addLog={addLog}
        />

        {hints?.start && (
          <button
            type="button"
            onClick={onRequestHint}
            className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold transition-colors"
          >
            Pedir dica
          </button>
        )}

        <div className="grid w-full grid-cols-2 items-start gap-4 mt-2 mb-2">

          <MentorBox
            status={mentorStatus}
            aiFeedback={aiFeedback}  
            messages={{
              phase: {
                error: hints?.error,
                success: hints?.success,
              }
            }}
          />

          <div className="flex min-w-0 flex-col gap-2">

            <Objectives items={objectives} />

            <ConsoleBox
              logs={logs}
              loading={loading || transitioning}
            />

          </div>

        </div>

      </div>

    </div>
  )
}
