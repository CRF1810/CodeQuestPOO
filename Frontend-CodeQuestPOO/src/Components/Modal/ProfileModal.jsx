import { LogOut, User, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../css/ProfileModal.css";
import { useState, useEffect } from "react";
import { getMe } from "../../Services/users/userService.js"
import { logout } from "../../Services/auth/authService.js";

export default function ProfileModal({ onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getMe();
        console.log("User id", userData.id)
        setUser(userData)
      } catch (error) {
        console.error("Erro ao obter utilziador:", error);
      }
    }
    getUser();
  }, []);
  
  return (
    <>

      <div className="profile-modal">
        <div className="pm-header">
          <span className="pm-title">Conta</span>
          <button className="pm-close" onClick={onClose}>
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
            <div className="pm-user-name">{user?.nome || "Guest"}</div>
            <div className="pm-user-email">{user?.email || "guest@email.com"}</div>
          </div>
        </div>

        <div className="pm-divider" />

        <div className="pm-menu">
          <button
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
            className="pm-logout"
            onClick={async () => {
              await logout(user.id);
              onClose();
              navigate("/", { replace: true });
            }}
          >

            <LogOut size={15} />
            Terminar Sessão
          </button>
        </div>
      </div>
    </>
  );
}
