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
              Próxima pergunta...
            </p>

          </div>

        </div>
      )}

      <div
        className={`
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

        <div className="flex flex-row mt-2 gap-4 mb-2">

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

          <div className="flex flex-col gap-2">

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
