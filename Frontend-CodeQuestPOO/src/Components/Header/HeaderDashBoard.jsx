import { useState, useEffect, useRef } from "react";
import { getProgressoDashboard } from "../../Services/users/userStatsService";
import { getPedidosAmizade } from "../../Services/users/amizadesService";
import logo from "../../Assets/logo.png";
import socket from "../../Services/socket/socket";
import {
  Home,
  Clock,
  Users,
  Bell,
  X,
  Star,
  Flame,
  DollarSign,
  Trophy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/ProfileModal";

function formatarTempo(segundos = 0) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;

  return h > 0 ? `${h}h` : m > 0 ? `${m}min` : `${s}s`;
}

export default function DashBoardHeader({ user }) {
  const [activeNav, setActiveNav] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newRequestToast, setNewRequestToast] = useState(null);
  const previousRequestIdsRef = useRef(null);
  const requestToastTimerRef = useRef(null);
  const [stats, setStats] = useState({
    tempo_total_jogo: 0,
    xp_total: 0,
    coins: 0,
    streak_dias: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("cq_token");
        if (!token) return;

        const data = await getProgressoDashboard(token);
        setStats(data);
      } catch (err) {
        console.error("Erro ao carregar stats:", err);
        setStats({
          tempo_total_jogo: 0,
          xp_total: 0,
          coins: 0,
          streak_dias: 0,
        });
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("aluno-online", user.id);

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    if (!localStorage.getItem("cq_token")) return;

    let active = true;
    previousRequestIdsRef.current = null;

    const checkFriendRequests = async () => {
      try {
        const requests = await getPedidosAmizade();
        if (!active) return;

        const pendingRequests = Array.isArray(requests) ? requests : [];
        const previousIds = previousRequestIdsRef.current;

        if (previousIds) {
          const newRequest = pendingRequests.find(
            (request) => !previousIds.has(String(request.id))
          );

          if (newRequest) {
            setNewRequestToast(newRequest.aluno?.nome || "Alguém");
            window.clearTimeout(requestToastTimerRef.current);
            requestToastTimerRef.current = window.setTimeout(
              () => setNewRequestToast(null),
              6000
            );
          }
        }

        previousRequestIdsRef.current = new Set(
          pendingRequests.map((request) => String(request.id))
        );
        setFriendRequests(pendingRequests);
      } catch (err) {
        if (active) console.error("Erro ao carregar notificações de amizade:", err);
      }
    };

    void checkFriendRequests();
    const interval = window.setInterval(checkFriendRequests, 30_000);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.clearTimeout(requestToastTimerRef.current);
    };
  }, [user?.id]);

  const abrirPedidosAmizade = () => {
    setNewRequestToast(null);
    setIsNotificationsOpen(false);
    navigate("/amigos");
  };

  const navItems = [
    { id: "home", icon: <Home size={20} />, label: "Início", path: "/Dashboard" },
    { id: "leaderboard", icon: <Trophy size={20} />, label: "Leaderboard", path: "/leaderBoard" },
    { id: "amigos", icon: <Users size={20} />, label: "Amigos", path: "/amigos" },
  ];

  return (
    <>
      <style>{`
        @keyframes statPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(6,182,212,0.4); }
          50% { box-shadow: 0 0 14px rgba(6,182,212,0.9); }
        }
        .stat-pill {
          transition: all 0.2s ease;
          animation: fadeSlideIn 0.4s ease both;
        }
        .stat-pill:hover {
          animation: statPop 0.3s ease;
          background: rgba(6,182,212,0.12) !important;
          border-color: rgba(6,182,212,0.35) !important;
          transform: translateY(-1px);
        }
        .stat-pill:hover span {
          color: #67e8f9 !important;
        }
        .active-dot {
          animation: glow-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 w-full h-20 flex items-center gap-4 px-6 py-4 z-50"
        style={{
          background: "black",
          boxShadow: "0 4px 32px rgba(0,0,0,0.5)"
        }}
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-yellow-500 to-purple-500 z-50" />

        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="CodeQuest POO Logo"
            className="h-14 w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        <nav className="flex items-center gap-2 ml-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.path);
              }}
              title={item.label}
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
              style={{
                color: activeNav === item.id ? "#06b6d4" : "rgba(255,255,255,0.4)",
                background: activeNav === item.id ? "rgba(6,182,212,0.12)" : "transparent",
                animation: activeNav === item.id ? "glow-pulse 1.8s ease-in-out infinite" : "none",
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.color = "#0891b2";
                  e.currentTarget.style.background = "rgba(8,145,178,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.icon}
              {activeNav === item.id && (
                <span
                  className="active-dot absolute bottom-0.5 left-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: "#06b6d4", transform: "translateX(-50%)" }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="w-px h-8 mx-3 bg-white/10" />

        <div className="flex items-center gap-2">
          <Stat icon={<Clock size={14} color="#06b6d4" />} value={formatarTempo(stats.tempo_total_jogo)} delay="0ms" />
          <Stat icon={<Star size={14} color="#facc15" />} value={`${stats.xp_total} XP`} delay="60ms" />
          <Stat icon={<DollarSign size={14} color="#a78bfa" />} value={stats.coins} delay="120ms" />
          <Stat icon={<Flame size={14} color="#f97316" />} value={stats.streak_dias} delay="180ms" />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-4 mr-2">
            <button
              type="button"
              aria-label={friendRequests.length
                ? `Notificações: ${friendRequests.length} pedidos de amizade pendentes`
                : "Notificações"}
              aria-haspopup="dialog"
              aria-expanded={isNotificationsOpen}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 bg-cyan-500/10 transition-all duration-200 hover:bg-cyan-600/20"
              onClick={() => {
                setIsModalOpen(false);
                setIsNotificationsOpen((open) => !open);
              }}
            >
              <Bell size={19} />
              {friendRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border border-black">
                  {friendRequests.length > 99 ? "99+" : friendRequests.length}
                </span>
              )}
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                border: "2px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 14px rgba(6,182,212,0.3)",
              }}
              onClick={() => {
                setIsNotificationsOpen(false);
                setIsModalOpen(true);
              }}
            >
              {user?.nome?.[0]?.toUpperCase() ?? "U"}
            </button>
          </div>
        </div>

        {isNotificationsOpen && (
          <div
            role="dialog"
            aria-label="Notificações"
            className="absolute top-full right-6 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white">Notificações</h2>
              <button
                type="button"
                aria-label="Fechar notificações"
                className="text-white/50 hover:text-white"
                onClick={() => setIsNotificationsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            {friendRequests.length === 0 ? (
              <p className="text-sm text-neutral-400">Ainda não tens notificações.</p>
            ) : (
              <div>
                <p className="text-xs text-neutral-400 mb-2">
                  {friendRequests.length === 1
                    ? "Tens um pedido de amizade pendente:"
                    : `Tens ${friendRequests.length} pedidos de amizade pendentes:`}
                </p>
                <div className="max-h-52 overflow-y-auto">
                  {friendRequests.slice(0, 5).map((request) => (
                    <button
                      key={request.id}
                      type="button"
                      onClick={abrirPedidosAmizade}
                      className="w-full flex items-center gap-3 rounded-xl px-2 py-2 text-left text-sm text-white hover:bg-white/5"
                    >
                      <span className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-300 flex items-center justify-center">
                        <Users size={15} />
                      </span>
                      <span>
                        <strong>{request.aluno?.nome || "Novo utilizador"}</strong>
                        <span className="block text-xs text-neutral-400">Enviou-te um pedido de amizade</span>
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={abrirPedidosAmizade}
                  className="mt-3 w-full rounded-xl border border-cyan-500/20 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10"
                >
                  Ver pedidos de amizade
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {isNotificationsOpen && (
        <button
          type="button"
          aria-label="Fechar notificações"
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setIsNotificationsOpen(false)}
        />
      )}

      {newRequestToast && (
        <button
          type="button"
          onClick={abrirPedidosAmizade}
          className="fixed top-24 right-6 z-[60] flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-neutral-950 px-4 py-3 text-left text-sm text-white shadow-xl shadow-black/40"
        >
          <span className="w-9 h-9 rounded-full bg-cyan-500/10 text-cyan-300 flex items-center justify-center">
            <Users size={17} />
          </span>
          <span>
            <strong className="block">Novo pedido de amizade</strong>
            <span className="text-xs text-neutral-400">{newRequestToast} enviou-te um pedido</span>
          </span>
        </button>
      )}

      <div className="relative">
        {isModalOpen && (
          <>
            <div
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                zIndex: 40,
              }}
            />

            <Modal
              user={user}
              onClose={() => setIsModalOpen(false)}
            />
          </>
        )}
      </div>
    </>
  );
}

function Stat({ icon, value, delay }) {
  return (
    <div
      className="stat-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10"
      style={{
        background: "rgba(255,255,255,0.04)",
        animationDelay: delay,
      }}
    >
      {icon}
      <span className="text-xs font-semibold" style={{ color: "#67e8f9" }}>
        {value}
      </span>
    </div>
  );
}
