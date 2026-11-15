import logo from '../../Assets/logo.png';
import { useNavigate } from "react-router-dom"


export default function HeaderLandingPage() {
    const navigate = useNavigate()

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        const title = el?.querySelector('h2') ?? el;
        if (!title) return;

        const headerHeight = document.querySelector('.landing-header')?.getBoundingClientRect().height ?? 0;
        const top = window.scrollY + title.getBoundingClientRect().top - headerHeight - 32;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };

    return (
        <header className="landing-header fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <nav className="relative w-full px-6 py-3">
                <div className="flex items-center justify-between max-w-full">
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src={logo}
                            alt="CodeQuest POO Logo"
                            className="h-20 w-auto hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={() => scrollToSection('historia')}
                            className="landing-header__button landing-header__button--link px-3 py-2.5 font-medium text-base lg:text-lg"
                        >
                            História
                        </button>
                        <button
                            onClick={() => scrollToSection('recursos')}
                            className="landing-header__button landing-header__button--link px-3 py-2.5 font-medium text-base lg:text-lg"
                        >
                            Recursos
                        </button>
                        <button
                            onClick={() => scrollToSection('cta')}
                            className="landing-header__button landing-header__button--link px-3 py-2.5 font-medium text-base lg:text-lg"
                        >
                            Jogar
                        </button>
                        <button
                            onClick={() => scrollToSection('herois')}
                            className="landing-header__button landing-header__button--link px-3 py-2.5 font-medium text-base lg:text-lg"
                        >
                            Heróis
                        </button>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0 mr-4">
                        <button onClick={() => navigate('/Login')} className="landing-header__login px-6 py-2.5 font-medium">
                            Login
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}