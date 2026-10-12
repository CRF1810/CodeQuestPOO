import { useState } from "react";

export default function AnswerOptions({
  options = [],
  onDragStart,
  onDragEnd,
  className = "",
}) {
  const [draggingId, setDraggingId] = useState(null);

  return (
    <div
      className={`
        relative w-full max-w-[750px] mt-6 p-4 rounded-3xl
         top-border-glow
        ${className}
      `}
    >
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((item) => {
          const isDragging = draggingId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              draggable
              onDragStart={(e) => {
                setDraggingId(item.id);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("application/json", JSON.stringify(item));
                onDragStart?.(item, e);
              }}
              onDragEnd={(e) => {
                setDraggingId(null);
                onDragEnd?.(item, e);
              }}
              className={`
                group relative
                min-w-[140px] max-w-full
                px-6 py-3
                rounded-2xl
                text-sm font-bold text-white text-center leading-snug
                break-words whitespace-normal
                bg-gradient-to-b from-indigo-500 to-indigo-700
                border border-indigo-300/40
                shadow-[0_4px_0_0_rgba(49,46,129,1),0_8px_16px_rgba(0,0,0,0.35)]
                cursor-grab active:cursor-grabbing
                transition-all duration-200
                hover:-translate-y-0.5 hover:brightness-110
                hover:shadow-[0_6px_0_0_rgba(49,46,129,1),0_12px_20px_rgba(99,102,241,0.4)]
                active:translate-y-1 active:shadow-[0_0_0_0_rgba(49,46,129,1)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                ${isDragging ? "opacity-50 scale-95" : ""}
              `}
            >
              {/* brilho no topo */}
              <span className="pointer-events-none absolute inset-x-3 top-1 h-1/3 rounded-full bg-white/20 blur-[2px]" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}