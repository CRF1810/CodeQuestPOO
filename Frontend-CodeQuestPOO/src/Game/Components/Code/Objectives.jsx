import { useState, useEffect, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ITEMS_PER_PAGE = 4;
const AUTO_ADVANCE_MS = 10000;

export default function Objectives({ items = [] }) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const currentItems = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page]);

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [totalPages, page]);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [totalPages]);

  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <div className="w-full min-w-0 px-4 py-4 bg-gray-800 border-t border-gray-800 rounded-4xl border-4 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between border-b-2 border-white mb-2">
        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
          Objetivos da fase
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 pb-1">
            <button onClick={goPrev} className="text-gray-500 hover:text-gray-300 transition-colors" aria-label="Página anterior">
              <FiChevronLeft size={12} />
            </button>
            <span className="text-[10px] font-mono text-gray-500">
              {page + 1}/{totalPages}
            </span>
            <button onClick={goNext} className="text-gray-500 hover:text-gray-300 transition-colors" aria-label="Próxima página">
              <FiChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

      <div key={page} className="flex min-w-0 flex-col gap-2 mt-4">
        {currentItems.map((item, i) => (
          <div
            key={i}
            className="flex min-w-0 items-center gap-2 opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span
              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border
              ${item.done
                  ? "bg-green-800/60 border-green-600 text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                  : "bg-gray-800 border-gray-700 text-gray-600"
                }`}
            >
              {item.done ? "✓" : ""}
            </span>
            <span className={`min-w-0 break-words text-xs font-mono ${item.done ? "text-gray-500 line-through" : "text-gray-300"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === page ? "bg-gray-300" : "bg-gray-700"}`}
              aria-label={`Ir para página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
