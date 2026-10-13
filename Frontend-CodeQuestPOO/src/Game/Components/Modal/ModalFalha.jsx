import { useEffect, useState } from "react"
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCw, Map, Swords, X, ArrowRight } from "lucide-react";

const CHALLENGE_ROUTES = {
    floresta: [
        "/floresta/nivel-1/desafio-1", "/floresta/nivel-1/desafio-2", "/floresta/nivel-1/desafio-3",
        "/floresta/nivel-2/desafio-4", "/floresta/nivel-2/desafio-5", "/floresta/nivel-2/desafio-6",
        "/floresta/nivel-3/desafio-7", "/floresta/nivel-3/desafio-8",
    ],
    vila: [
        "/vila/nivel-5/desafio-9", "/vila/nivel-5/desafio-10", "/vila/nivel-5/desafio-11",
        "/vila/nivel-6/desafio-12", "/vila/nivel-6/desafio-13", "/vila/nivel-6/desafio-14",
        "/vila/nivel-7/desafio-15", "/vila/nivel-7/desafio-16",
    ],
    castelo: [
        "/castelo/nivel-8/desafio-17", "/castelo/nivel-8/desafio-18", "/castelo/nivel-8/desafio-19",
        "/castelo/nivel-9/desafio-20", "/castelo/nivel-9/desafio-21",
        "/castelo/nivel-10/desafio-22", "/castelo/nivel-10/desafio-23",
    ],
};

const MAP_ROUTES = {
    floresta: "/FlorestaDosAlgoritmos",
    vila: "/VilaDaLogica",
    castelo: "/CasteloDoCaos",
};

export default function ModalFalha({
    isOpen,
    onRepetir,
    onVoltar,
    correct = 0,
    wrong = 0,
    time = 0,
}) {
    const [visible, setVisible] = useState(false);
    const [animatingOut, setAnimatingOut] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const mapKey = location.pathname.startsWith("/vila/")
        ? "vila"
        : location.pathname.startsWith("/castelo/")
            ? "castelo"
            : "floresta";
    const routeList = CHALLENGE_ROUTES[mapKey];
    const currentRouteIndex = routeList.indexOf(location.pathname);
    const nextRoute = routeList[currentRouteIndex + 1] || MAP_ROUTES[mapKey];

    const mins = Math.floor(time / 60);
    const secs = time % 60;
    const fmt = (n) => n.toString().padStart(2, "0");

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            requestAnimationFrame(() => setAnimatingOut(false));
        } else {
            setAnimatingOut(true);
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimatingOut(true);
        setTimeout(() => {
            setVisible(false);
            setAnimatingOut(false);
        }, 320);
        navigate(MAP_ROUTES[mapKey]);
    };

    const handleContinue = () => {
        setAnimatingOut(true);
        setTimeout(() => {
            setVisible(false);
            setAnimatingOut(false);
            navigate(nextRoute);
        }, 320);
    };

    if (!visible) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/75 transition-opacity duration-300 ${animatingOut ? "opacity-0" : "opacity-100"}`}
            onClick={handleClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-neutral-950 border border-neutral-800 rounded-3xl px-8 py-8 w-[360px] text-center shadow-2xl"
                style={{
                    boxShadow: "0 0 60px -20px rgba(239,68,68,0.2)",
                    transform: animatingOut ? "scale(0.95) translateY(8px)" : "scale(1) translateY(0)",
                    transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.32s ease",
                    opacity: animatingOut ? 0 : 1,
                }}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-7 h-7 rounded-xl flex items-center justify-center text-neutral-600 hover:text-neutral-300 hover:bg-neutral-800 transition-all"
                >
                    <X size={14} />
                </button>

                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-5">
                    <Swords size={28} className="text-red-400" />
                </div>

                <p className="text-[10px] tracking-widest text-red-500/70 font-extrabold uppercase mb-1">
                    Desafio Falhado
                </p>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                    Não desistas!
                </h2>

                <div className="w-10 h-0.5 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-transparent" />

                <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                    Cometeste <span className="text-red-400 font-bold">{wrong}</span> erros consecutivos. Revê os conceitos e tenta novamente.
                </p>

                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl px-4 py-4 flex justify-around mb-6">
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-[9px] tracking-widest text-neutral-600 uppercase font-bold">Erros</p>
                        <p className="text-2xl font-black text-red-400 tabular-nums">{wrong}</p>
                    </div>
                    <div className="w-px bg-neutral-800" />
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-[9px] tracking-widest text-neutral-600 uppercase font-bold">Acertos</p>
                        <p className="text-2xl font-black text-green-400 tabular-nums">{correct}</p>
                    </div>
                    <div className="w-px bg-neutral-800" />
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-[9px] tracking-widest text-neutral-600 uppercase font-bold">Tempo</p>
                        <p className="text-2xl font-black text-neutral-300 tabular-nums">
                            {fmt(mins)}:{fmt(secs)}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 mb-2 bg-gradient-to-br from-blue-500 to-blue-800 text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.4)]"
                >
                    <ArrowRight size={15} />
                    Continuar
                </button>

                <button
                    onClick={onRepetir}
                    className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 mb-2"
                    style={{
                        background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                        color: "#fff",
                        boxShadow: "0 0 20px -4px rgba(239,68,68,0.5)",
                    }}
                >
                    <RefreshCw size={15} />
                    Tentar novamente
                </button>

                {onVoltar && (
                    <button
                        onClick={onVoltar}
                        className="w-full py-3 rounded-2xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-neutral-500 border border-neutral-800 hover:border-neutral-600 hover:text-neutral-300 transition-all duration-200"
                    >
                        <Map size={14} />
                        Voltar ao mapa
                    </button>
                )}
            </div>
        </div>,
        document.body
    );
}
