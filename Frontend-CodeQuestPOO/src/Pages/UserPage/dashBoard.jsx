import DashBoardHeader from "../../Components/Header/HeaderDashBoard";
import { useNavigate } from "react-router-dom";
import { getProgresso, getProgressoDashboard } from "../../Services/users/userStatsService";
import { getTipoDeErrosUsers } from "../../Services/users/errorsUsers";
import { getDesempenhoCodigo } from "../../Services/users/performaceService";
import { getUserTempo } from "../../Services/users/jogTemService";
import { obterXPAluno } from "../../Services/gameplay/xpProgressService";
import { getMapas } from "../../Services/maps/mapasService";
import map1 from "../../Assets/Maps/FirstMap.png";
import map2 from "../../Assets/Maps/SecondMap.png";
import map3 from "../../Assets/Maps/ThirdMap.png";
import { useState, useEffect } from "react";
import mago from "../../Assets/DashBoard/mago.png";
import loadingVideo from "../../Assets/Loading/loading.webm";
import "../../css/DashBoard.css";
import {
    ChartNoAxesCombined,
    Map,
    Lock,
    Skull,
    CheckCircle2,
    Target,
    BookOpen,
    ArrowUpRight,
} from "lucide-react";

//Dumb data


const DAYS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function getDayofWeek() {
    try {
        const today = new Date();
        const dayLisbon = new Intl.DateTimeFormat("pt-PT", {
            weekday: "long",
            timeZone: "Europe/Lisbon",
        }).format(today);

        const shortDay = dayLisbon.split("-")[0];
        const currentDayOfWeek = DAYS.indexOf(shortDay);

        console.log(`Dia: ${shortDay}, Índice: ${currentDayOfWeek}`);
        return currentDayOfWeek;
    } catch (erro) {
        console.error("Erro ao obter dia da semana:", erro);
        return -1;
    }
}

const ERROR_COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#a855f7",
    "#3b82f6",
    "#22c55e",
];

function mapErrosToDB(quantidadeDeErros = [], tipoDeErros = []) {
    const contagemPorTipo = new Map(
        quantidadeDeErros.map(e => [Number(e.tipo_erro_id), Number(e.quantidade) || 0])
    );
    const total = [...contagemPorTipo.values()].reduce((sum, count) => sum + count, 0);

    return tipoDeErros.map((tipo, i) => {
        const count = contagemPorTipo.get(Number(tipo.id)) ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return {
            name: tipo.nome,
            count,
            pct,
            color: ERROR_COLORS[i % ERROR_COLORS.length],
        };
    });
}

// ============================================================
// 🔷 AccuracyChart
// ============================================================
function AccuracyChart({ accuracy, errors }) {
    const r = 50;
    const circ = 2 * Math.PI * r;
    const aDash = circ * (accuracy / 100);
    const eDash = circ * (errors / 100);

    return (
        <div className="flex items-center gap-5">
            <div className="relative w-28 h-28 flex-shrink-0">
                <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
                    <circle cx="65" cy="65" r={r} fill="none" stroke="#1a1a1a" strokeWidth="11" />
                    <circle
                        cx="65" cy="65" r={r}
                        fill="none" stroke="#2a2a2a" strokeWidth="11"
                        strokeDasharray={`${eDash} ${circ}`}
                    />
                    <circle
                        cx="65" cy="65" r={r}
                        fill="none" stroke="#c89a0e" strokeWidth="11"
                        strokeDasharray={`${aDash} ${circ}`}
                        strokeDashoffset={-eDash}
                        style={{ filter: "drop-shadow(0 0 5px #d4a01788)" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-bold text-base leading-none">{accuracy}%</span>
                    <span className="text-gray-500 text-[10px]">acerto</span>
                </div>
            </div>

            <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-600 flex-shrink-0" />
                    <span className="text-gray-400 text-xs">Acertos:</span>
                    <span className="text-white font-bold text-xs ml-1">{accuracy}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600 flex-shrink-0" />
                    <span className="text-gray-400 text-xs">Erros:</span>
                    <span className="text-white font-bold text-xs ml-1">{errors}%</span>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// 🔷 WeeklyBars
// ============================================================
function WeeklyBars({ activity, currentDayOfWeek }) {
    const max = Math.max(...activity, 1);

    return (
        <div className="flex items-end gap-1.5 h-32">
            {activity.map((val, i) => {
                const h = (val / max) * 100;
                const active = i === currentDayOfWeek;
                const past = i < currentDayOfWeek;

                const barClass = active
                    ? "bg-gradient-to-t from-yellow-500 to-green-400 shadow-md shadow-green-500/40"
                    : past
                        ? "bg-gradient-to-t from-yellow-600/70 to-green-500/50"
                        : "bg-gray-700/40 hover:bg-gray-600/50";

                const labelClass = active
                    ? "text-green-400"
                    : past
                        ? "text-gray-600"
                        : "text-gray-600";

                return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                        <div
                            style={{ height: `${Math.max(h, 2)}%` }}
                            className={`w-full rounded-sm transition-all ${barClass}`}
                        />
                        <span className={`text-[9px] font-medium ${labelClass}`}>
                            {DAYS[i]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}


// ============================================================
// 🔷 XPBar
// ============================================================
function XPBar({ current = 0, total = 0 }) {
    const safeCurrent = current ?? 0;
    const safeTotal = total ?? 0;
    const pct = safeTotal > 0 ? Math.min((safeCurrent / safeTotal) * 100, 100) : 100;

    return (
        <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-xs">
                <span className="text-gray-500">Nível</span>
                <span className="text-yellow-400 font-bold">
                    {safeCurrent.toLocaleString()} / {safeTotal > 0 ? safeTotal.toLocaleString() : "MAX"} XP
                </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-2 rounded-full transition-all duration-1000 animate-shimmer"
                    style={{
                        width: `${pct}%`,
                        background: "linear-gradient(to right, #d4a017, #84cc16)",
                        boxShadow: "0 0 8px #d4a01755",
                    }}
                />
            </div>
            <span className="text-gray-600 text-[10px] text-right">
                {safeTotal > 0
                    ? `Faltam ${(safeTotal - safeCurrent).toLocaleString()} XP para o próximo nível`
                    : "👑 Nível Máximo Atingido!"}
            </span>
        </div>
    );
}

// ============================================================
// 🔷 MainCard
// ============================================================
function MainCard({ player, calculoXp, currentDayOfWeek, navigate }) {
    console.log("Desempenho recebido no MainCard:", calculoXp);

    const progressaoXp = calculoXp?.progressao || {};

    return (
        <div className="relative bg-[#151414] rounded-3xl border border-gray-800 overflow-hidden animate-slideInLeft">

            {/* Topo: título + badge */}
            <div className="flex justify-between items-center px-4 pt-5 pb-2 md:px-6">
                <h2 className="text-white font-bold text-xl tracking-wide md:text-2xl">
                    Bem-vindo, {player.name}!
                </h2>
                <span className="hidden text-xs text-gray-500 border border-gray-700 rounded px-2 py-0.5 md:block">
                    {progressaoXp.titulo}
                </span>
            </div>

            <div className="flex flex-col gap-5 px-4 pb-6 md:flex-row md:gap-0 md:px-6 md:pr-64">

                <div className="flex w-full flex-col gap-4 md:w-58 md:flex-shrink-0">
                    <AccuracyChart accuracy={player.accuracy} errors={player.errors} />
                    <div className="border-t border-gray-800" />

                    <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-[10px]">Semana reseta em</p>
                                <p className="text-white font-bold text-xl mt-0.5">
                                    {player.diasAteReset} {player.diasAteReset === 1 ? "dia" : "dias"}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-600 text-[10px]">Semana Iniciada    </p>
                                <p className="text-gray-400 text-xs mt-0.5">
                                    {player.ultimaAtualizado
                                        ? new Date(player.ultimaAtualizado).toLocaleDateString("pt-PT")
                                        : "-"}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                style={{ width: `${((7 - player.diasAteReset) / 7) * 100}%` }}
                                className="h-1.5 bg-gradient-to-r from-yellow-500 to-green-400 transition-all duration-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                        <button
                            onClick={() => navigate("/HistoricoSemanal")}
                            className="flex items-center gap-1.5 text-[11px] text-gray-400 border border-gray-700 rounded-lg px-3 py-1.5 hover:border-yellow-600 hover:text-yellow-500 transition-colors"
                        >
                            Ver histórico semanal
                        </button>
                    </div>
                </div>

                <div className="hidden w-px bg-gray-800 mx-6 self-stretch md:block" />

                <div className="flex flex-col gap-4 md:mt-10 md:flex-1">
                    <WeeklyBars activity={player.weekActivity} currentDayOfWeek={currentDayOfWeek} />
                    <div className="border-t border-gray-800" />
                    <XPBar current={progressaoXp.xpTotal} total={progressaoXp.xpProximoNivel} />
                    <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                        <div className="bg-gray-800/50 rounded-lg p-2 text-center border border-gray-700/30">
                            <p className="text-white font-bold text-base">{player.desafios}</p>
                            <p className="text-gray-500 text-[10px]">Desafios</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-2 text-center border border-gray-700/30">
                            <p className="text-white font-bold text-base">{player.dicasUsadas}</p>
                            <p className="text-gray-500 text-[10px]">Dicas Usadas</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="pointer-events-none absolute right-0 top-0 hidden w-64 overflow-hidden md:bottom-0 md:block"
                style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
                    maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
                }}
            >
                <img src={mago} alt="" className="h-full w-full object-cover object-top" />
            </div>
        </div>
    );
}

// ============================================================
// 🔷 MapsPanel
// ============================================================

function MapsPanel({ maps }) {
    return (
        <div className="bg-[#151414] rounded-4xl border border-gray-800 p-4 flex flex-col gap-3 flex-1 animate-slideInDown">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1">
                    <Map size={18} />
                    Mapas de Aprendizado
                </h3>
            </div>

            {maps.map((m, i) => {
                const pct = m.total > 0 ? Math.min((m.desafios / m.total) * 100, 100) : 0;

                return (
                    <div key={i} className="flex flex-col gap-2 hover:scale-105 transition-transform duration-300 mt-3">
                        <div
                            className="rounded-lg h-14 flex items-center justify-between px-3 mt-3"
                        >
                            <div className="flex items-center gap-2">
                                <div className="relative w-18 h-22 mb-4 flex-shrink-0">
                                    <img
                                        src={m.mapImg}
                                        alt={m.nome}
                                        className={`w-full h-full rounded-2xl mb-2 transition-all duration-300 ${m.locked ? "grayscale opacity-40" : ""
                                            }`}
                                    />
                                    {m.locked && (
                                        <div className="absolute inset-0 flex items-center justify-center mb-2">
                                            <Lock size={14} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <p className={`text-xs font-semibold leading-none ${m.locked ? "text-gray-600" : "text-white"}`}>
                                        {m.nome}
                                    </p>
                                    <p className="text-gray-500 text-[10px] mt-0.5 flex items-center gap-1">
                                        <Skull size={10} />
                                        Boss: {m.boss}
                                    </p>
                                </div>
                            </div>

                            {m.locked ? (
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Lock size={13} />
                                    <span className="text-[10px] font-semibold">Bloqueado</span>
                                </div>
                            ) : m.done ? (
                                <div className="flex items-center gap-1 text-green-400">
                                    <CheckCircle2 size={13} />
                                    <span className="text-[10px] font-bold">Completo</span>
                                </div>
                            ) : (
                                <span className="text-[10px] font-bold" style={{ color: m.color }}>
                                    {pct.toFixed(0)}%
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between text-[10px] text-gray-500">
                            <span>Progresso</span>
                            <span className={m.locked ? "text-gray-700" : "text-gray-400"}>
                                {m.locked ? "— / —" : `${m.desafios}/${m.total} Desafios`}
                            </span>
                        </div>

                        <div className="h-1 bg-gray-800 rounded-full">
                            <div
                                className="h-1 rounded-full transition-all duration-1000"
                                style={{
                                    width: `${m.locked ? 0 : pct}%`,
                                    backgroundColor: m.locked ? "#374151" : m.color,
                                    boxShadow: (!m.locked && pct > 0) ? `0 0 6px ${m.color}66` : "none",
                                    animation: m.done ? "glow 2s ease-in-out infinite" : "none",
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ============================================================
// 🔷 AnimatedBar — barra com entrada progressiva
// ============================================================
function AnimatedBar({ pct, color, delay = 0 }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(pct), 120 + delay);
        return () => clearTimeout(timer);
    }, [pct, delay]);

    return (
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
                className="h-1.5 rounded-full"
                style={{
                    width: `${width}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}88`,
                    transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            />
        </div>
    );
}

// ============================================================
// 🔷 ErrorTypesPanel — dados reais da BD
// ============================================================
function ErrorTypesPanel({ errors }) {
    const navigate = useNavigate();

    const safeErrors = Array.isArray(errors) ? errors : [];

    return (
        <div className="bg-[#151414] rounded-4xl border border-gray-800 p-4 flex flex-col gap-3 flex-1 animate-slideInDown delay-200">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1">
                    <ChartNoAxesCombined size={18} />
                    Tipos de Erros
                </h3>
                <button
                    onClick={() => navigate("/Erros")}
                    className="w-20 h-5 p-3 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 text-xs hover:text-white"
                >
                    Ver mais
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {safeErrors.map((e, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-1.5 hover:bg-gray-800/30 p-2 rounded transition-colors"
                    >
                        <div className="flex justify-between items-center text-xs">
                            <span className={e.count > 0 ? "text-gray-300 font-medium" : "text-gray-600 font-medium"}>
                                {e.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-[10px]">{e.pct}% dos erros</span>
                                <span className="font-bold text-xs" style={{ color: e.count > 0 ? e.color : "#444" }}>
                                    {e.count}×
                                </span>
                            </div>
                        </div>
                        <AnimatedBar pct={e.pct} color={e.color} delay={i * 120} />
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-800 pt-3 mt-1">
                <div className="flex gap-1 flex-wrap">
                    {safeErrors.map((e, i) => (
                        <span
                            key={i}
                            className="text-[10px] rounded px-2 py-0.5 font-medium"
                            style={{
                                backgroundColor: e.color + (e.count > 0 ? "22" : "0a"),
                                color: e.count > 0 ? e.color : e.color + "55",
                            }}
                        >
                            {e.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function DailyMissionsPanel({ navigate }) {
    const missions = [
        {
            id: "campaign",
            title: "Avança na campanha",
            description: "Escolhe um mapa e resolve um desafio.",
            action: "Explorar mapas",
            path: "/Maps",
            icon: <Map size={16} />,
        },
        {
            id: "practice",
            title: "Pratica sem dicas",
            description: "Tenta concluir o próximo desafio sem pedir ajuda.",
            action: "Começar desafio",
            path: "/Maps",
            icon: <Target size={16} />,
        },
        {
            id: "review",
            title: "Aprende com os erros",
            description: "Revê os erros registados e reforça a matéria.",
            action: "Ver desempenhos",
            path: "/Erros",
            icon: <BookOpen size={16} />,
        },
    ];

    return (
        <section className="self-start rounded-3xl border border-gray-800 bg-[#151414] p-5 xl:sticky xl:top-6">
            <div className="mb-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-white">
                    <Target size={18} className="text-amber-400" />
                    Missões diárias
                </h3>
                <p className="mt-1 text-xs text-gray-500">Pequenos objetivos para a tua próxima sessão.</p>
            </div>

            <div className="flex flex-col gap-3">
                {missions.map((mission) => {
                    return (
                        <article key={mission.id} className="rounded-2xl border border-gray-800 bg-[#1a1a1a] p-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                                    {mission.icon}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-semibold text-gray-200">{mission.title}</h4>
                                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{mission.description}</p>
                                    <button
                                        type="button"
                                        onClick={() => navigate(mission.path)}
                                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                                    >
                                        {mission.action}
                                        <ArrowUpRight size={13} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

// ============================================================
// 🔷 Helpers
// ============================================================
function formatTempo(minutos = 0) {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h} H ${m} M`;
}

function mapProgressToPlayer(userData, data, tempo) {
    const progressao = data.progressao || {};

    return {
        name: userData.nome,
        heroi: mago,
        memberSince: userData.data_registo,

        weekActivity: tempo?.weekActivity || [0, 0, 0, 0, 0, 0, 0],
        hoursThisWeek: tempo?.hoursThisWeek || "0 H 0 M",
        maxPerDay: tempo?.maxPerDay || "0 H 0 M",
        diasAteReset: tempo?.diasAteReset || 7,
        ultimaAtualizado: tempo?.ultimaAtualizado || null,

        currentDay: 5,
        diasSeguidos: data.streak_dias ?? 0,
        dicasUsadas: data.dicas_usadas ?? 0,
        desafios: data.desafios_completos ?? 0,
        accuracy: data.acertos ?? 0,
        errors: data.errors ?? 0,

        totalXP: progressao.xpAtual ?? 0,
        nextLevelXP: progressao.xpProximoNivel ?? 500,
        level: progressao.nivel ?? 1,
        rank: progressao.titulo ?? "Aprendiz",
    };
}

function mapTempoToUI(apiTempo) {
    const tempo = apiTempo?.getTempo;

    if (!tempo) {
        return {
            hoursThisWeek: "0 H 0 M",
            maxPerDay: "0 H 0 M",
            tempoTotal: "0 H 0 M",
            weekActivity: [0, 0, 0, 0, 0, 0, 0],
            ultimaAtualizado: null,
            diasAteReset: 7,
        };
    }

    return {
        hoursThisWeek: formatTempo(tempo.horas_semana || 0),
        maxPerDay: formatTempo(tempo.max_tempo_dia || 0),
        tempoTotal: formatTempo(tempo.tempo_total || 0),
        weekActivity: tempo.atividade_semana || [0, 0, 0, 0, 0, 0, 0],
        ultimaAtualizado: tempo.ultimoAtualizado || null,
        diasAteReset: tempo.diasAteReset || 7,
    };
}

// ============================================================
// 🔷 DashBoard (componente principal)
// ============================================================
export function DashBoard() {
    const [user, setUser] = useState(null);
    const [progresso, setProgresso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mapasProgresso, setMapasProgresso] = useState([]);
    const [progressaoXp, setProgressaoXp] = useState(null);
    const [errors, setErrors] = useState(/** @type {Array} */([]));
    const [desempenho, setDesempenho] = useState(null);
    // Helper para garantir que errors é sempre array antes de fazer set
    const safeSetErrors = (val) => setErrors(Array.isArray(val) ? val : []);

    const navigate = useNavigate();
    const token = localStorage.getItem("cq_token");

    useEffect(() => {
        try {
            if (!token) {
                navigate("/login");
            }
        } catch (err) {
            console.error("Erro ao verificar autenticação", err.response || err);
        }
    }, [navigate, token]);

    useEffect(() => {
        async function fetchProgressao() {
            try {
                const resultado = await obterXPAluno();
                if (resultado) {
                    console.log("[Dashboard] Progressão carregada:", resultado);
                    setProgressaoXp(resultado);
                }
            } catch (err) {
                console.error("Erro ao carregar progressão", err);
            }
        }
        fetchProgressao();
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("cq_user");

        if (!storedUser) {
            queueMicrotask(() => setLoading(false));
            queueMicrotask(() => {
                setLoading(false);
                console.error("[Dashboard] Sem utilizador no localStorage");
            });
            return;
        }

        const userData = JSON.parse(storedUser);
        console.log("[Dashboard] User data:", userData);
        queueMicrotask(() => setUser(userData));

        const token = localStorage.getItem("cq_token");

        Promise.all([
            getProgressoDashboard(token),
            getUserTempo(),
        ])
            .then(([dashboardData, tempoData]) => {
                const tempoUI = mapTempoToUI(tempoData);
                console.log("Tempo vindo da Api", tempoUI);
                const player = mapProgressToPlayer(userData, dashboardData, tempoUI);
                setProgresso(player);
            })
            .catch(err => {
                const errorMsg = err.response?.data?.error || err.message || "Erro desconhecido";
                console.error("[Dashboard] Erro ao carregar progresso:", errorMsg);
                setProgresso({ name: userData.nome });
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("cq_token");
        const MAP_IMAGES = [map1, map2, map3];
        try {
            getMapas()
                .then(mapas => getProgresso(token).then(progresso => ({ mapas, progresso })))
                .then(({ mapas, progresso }) => {

                    const combinados = mapas.map((m, index) => {
                        const prog = progresso.find(p => p.mapa === m.id) || {};
                        return {
                            ...m,
                            mapImg: MAP_IMAGES[index] || map1,
                            desafios: prog.desafios_completos || 0,
                            total: prog.total_desafios || 0,
                            locked: !prog.desbloqueado,
                            done: prog.porcentagem === 100,
                            color: "#22c55e",
                            bgColor: "#333",
                            boss: "Boss",
                        };
                    });
                    console.log("Mapas e progresso:", combinados);
                    setMapasProgresso(combinados);
                });
        } catch (err) {
            console.error("Erro ao carregar mapas e progresso", err.response || err);
        }
    }, []);

    useEffect(() => {
        const fetchErros = async () => {
            try {
                const data = await getTipoDeErrosUsers();
                console.log("Erros da BD:", data);
                // Usa apenas quantidadeDeErros — é o que importa para o painel
                safeSetErrors(mapErrosToDB(data?.quantidadeDeErros, data?.TipoDeErros));
            } catch (err) {
                console.error("Erro ao carregar erros", err.response || err);
                safeSetErrors([]);
            } finally {
                setLoading(false);
            }
        };

        fetchErros();
    }, []);

    useEffect(() => {
        async function fetchDesempenho() {
            try {
                const data = await getDesempenhoCodigo();
                setDesempenho(data?.resumo ?? null);
            } catch (err) {
                console.error("Erro ao carregar desempenho:", err);
            }
        }
        fetchDesempenho();
    }, []);

    if (loading) {
        return (
            <div className="relative min-h-screen bg-[#000000]">
                <DashBoardHeader user={user} layout="sidebar" />
                <div className="ml-20 flex min-h-screen flex-col items-center justify-center overflow-hidden select-none md:ml-64">
                  <div className="z-10 flex flex-col items-center gap-6">
                    <div className="relative w-40 h-40 flex items-center justify-center p-2 bg-[#080808]/50 rounded-xl">
                        <video
                            src={loadingVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-3 mt-2">
                        <p className="text-white text-sm font-semibold tracking-[0.3em] uppercase animate-pulse">
                            Carregando
                        </p>
                        <div className="flex gap-1.5 justify-center">
                            {[0, 0.2, 0.4].map((delay, i) => (
                                <div
                                    key={i}
                                    className="w-1 h-1 rounded-full bg-amber-500/80"
                                    style={{
                                        animation: `dot-pulse 1.4s ease-in-out infinite`,
                                        animationDelay: `${delay}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }

    const currentDayOfWeek = getDayofWeek();

    const totalRespostas =
        (desempenho?.total_certas ?? 0) +
        (desempenho?.total_erradas ?? 0);

    const accuracyPct = totalRespostas > 0
        ? Math.round((desempenho.total_certas / totalRespostas) * 100)
        : 0;

    const errorsPct = totalRespostas > 0
        ? Math.round((desempenho.total_erradas / totalRespostas) * 100)
        : 0;
        
    return (
        <div className="relative min-h-screen bg-black animate-fadeIn">
            <DashBoardHeader user={user} layout="sidebar" />

            <main className="ml-20 p-4 md:ml-64 md:p-6">

                {progresso && progressaoXp && (
                    <MainCard
                        player={{
                            ...progresso,
                            accuracy: accuracyPct,
                            errors: errorsPct,
                        }}
                        calculoXp={progressaoXp}
                        currentDayOfWeek={currentDayOfWeek}
                        navigate={navigate}
                    />
                )}

                <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.9fr)]">
                    <div className="flex flex-col gap-4">
                        <MapsPanel maps={mapasProgresso} />
                        <ErrorTypesPanel errors={errors} />
                    </div>
                    <DailyMissionsPanel navigate={navigate} />
                </div>
            </main>
        </div>
    );
}
