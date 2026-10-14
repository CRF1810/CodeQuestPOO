import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, CheckCircle, AlertCircle, X } from 'lucide-react';
import logo from '../../Assets/logo.png';
import Bg from '../../Assets/Login/BgLogin.jpg';
import HeroSection from '../../Assets/Login/Hero.png';
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../../Services/auth/authService";
import { saveToken } from "../../Services/auth/authStorage";

const Toast = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';
  const duration = 4200;

  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-toast-impact">
      <div className={`flex flex-col min-w-[320px] max-w-md rounded-2xl shadow-2xl backdrop-blur-md border overflow-hidden ${isSuccess
        ? 'bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 border-emerald-400/50'
        : 'bg-gradient-to-r from-rose-500/95 to-rose-600/95 border-rose-400/50'
        }`}>
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
            {isSuccess ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <AlertCircle className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/70 hover:text-white transition-colors hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* barra de progresso — dá noção de quanto tempo falta até fechar */}
        <div className="h-1 bg-black/20">
          <div
            className="h-full bg-white/70 animate-toast-bar"
            style={{ animationDuration: `${duration - 100}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await authLogin(email, password);
      saveToken(token);
      localStorage.setItem('cq_user', JSON.stringify(user));
      showToast('Login efetuado com sucesso!', 'success');
      setTimeout(() => navigate('/Dashboard'), 1500);
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Erro ao efetuar login. Verifica as tuas credenciais.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/CriarConta");
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <img src={Bg} alt="Background" className="fixed inset-0 bg-gradient-to-br from-black/300 via-slate-900/60 to-black/300 z-10" />

      <div className="fixed inset-0 bg-black/80 z-10"></div>

      <div className="min-h-screen flex relative z-20">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <img src={logo} alt="CodeQuestPOO RP Logo" className="mx-auto w-150 h-55 mb-4" />
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-slate-700/50">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de Volta</h2>
                <p className="text-slate-400 text-sm">
                  Entra com as tuas credenciais para aceder à conta
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@exemplo.com"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all hover:border-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Palavra-passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Escreve a tua palavra-passe"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-11 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all hover:border-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <label className="flex items-center text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                    <input type="checkbox" className="mr-2 rounded border-slate-600 bg-slate-900/50 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0" />
                    Lembrar-me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3.5 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 flex items-center justify-center gap-2 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" />
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-800/50 text-slate-400">
                    Não tens conta?
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateAccount}
                className="w-full bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Criar Conta
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 relative">
          <div className="relative z-10 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-[3rem] rotate-12 -z-10"></div>
              <div className="absolute w-[370px] h-[370px] bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-[2.5rem] -rotate-12 translate-x-12 translate-y-8 -z-20"></div>
              <div className="absolute w-32 h-32 bg-cyan-400/50 rounded-2xl rotate-45 -left-16 -top-16 -z-10"></div>
              <div className="absolute w-24 h-24 bg-blue-400/50 rounded-xl -rotate-45 -right-12 -bottom-12 -z-10"></div>
            </div>

            <img
              src={HeroSection}
              alt="Hero Section"
              className="relative w-auto h-auto max-h-[750px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes toast-impact {
          0% { transform: translateY(-14px) scale(0.92); opacity: 0; }
          55% { transform: translateY(2px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes toast-bar {
          from { width: 100%; }
          to { width: 0%; }
        }

        .animate-toast-impact {
          animation: toast-impact 0.38s cubic-bezier(.34,1.56,.64,1) both;
        }

        .animate-toast-bar {
          animation: toast-bar linear forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-toast-impact { animation: none !important; }
        }
      `}</style>
    </>
  );
}
