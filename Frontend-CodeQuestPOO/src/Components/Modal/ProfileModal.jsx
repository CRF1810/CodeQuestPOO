import { LogOut, User, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../css/ProfileModal.css";
import { useState, useEffect } from "react";
import { getMe } from "../../Services/users/userService.js"
import { logout } from "../../Services/auth/authService.js";

export default function ProfileModal({ user: initialUser, onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser ?? null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    const getUser = async () => {
      try {
        const userData = await getMe();
        if (active) setUser(userData);
      } catch (error) {
        console.error("Erro ao obter utilizador:", error);
      }
    }

    void getUser();
    return () => {
      active = false;
    };
  }, []);

  const terminarSessao = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logout(user?.id);
    onClose();
    navigate("/", { replace: true });
  };
  
  return (
    <>

      <div className="profile-modal">
        <div className="pm-header">
          <span className="pm-title">Conta</span>
          <button type="button" aria-label="Fechar conta" className="pm-close" onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        <div className="pm-hero">
          <div className="pm-avatar-wrap">
            <div className="pm-avatar">
              <User size={26} color="#fff" />
            </div>
            <div className="pm-avatar-dot" />
          </div>
          <div>
            <div className="pm-user-name">{user?.nome || "A carregar conta..."}</div>
            <div className="pm-user-email">{user?.email || "Email não disponível"}</div>
          </div>
        </div>

        <div className="pm-divider" />

        <div className="pm-menu">
          <button
            type="button"
            type="button"
            className="pm-menu-item w-full text-left"
            onClick={() => {
              onClose();
              navigate("/Perfil");
            }}
          >
            <div className="pm-menu-icon">
              <User size={15} />
            </div>
            <span className="pm-menu-label">
              Perfil
            </span>
            <ChevronRight size={14} className="pm-menu-arrow" />
          </button>
        </div>

        <div className="pm-footer">
          <button
            type="button"
            disabled={isLoggingOut}
            className="pm-logout"
            onClick={terminarSessao}
          >

            <LogOut size={15} />
            {isLoggingOut ? "A terminar sessão..." : "Terminar Sessão"}
          </button>
        </div>
      </div>
    </>
  );
}
