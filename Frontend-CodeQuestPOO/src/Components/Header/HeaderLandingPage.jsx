import { useState } from 'react';
import { FaChevronDown, FaGamepad } from 'react-icons/fa';
import logo from '../../Assets/logo.png';
import { useNavigate } from "react-router-dom"


export default function HeaderLandingPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleDropdownSelect = (valor) => {
        if (valor === 'recursos') scrollToSection('recursos');
        if (valor === 'herois') scrollToSection('herois');
        setIsDropdownOpen(false);
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
                    <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        {/* Dropdown Customizado */}
                        <div className="relative group">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="landing-header__button landing-header__button--menu flex items-center gap-2 px-5 py-2.5 font-medium text-lg"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="menu"
                            >
                                <FaGamepad className="text-amber-300" />
                                <span>Game Info</span>
                                <FaChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="landing-header__dropdown absolute top-full mt-2 left-0 w-56 overflow-hidden animate-dropdown" role="menu">
                                    <div className="p-2">
                                        <button
                                            onClick={() => handleDropdownSelect('recursos')}
                                            className="landing-header__dropdown-item w-full text-left px-4 py-3 transition-all duration-200 flex items-center gap-3"
                                            role="menuitem"
                                        >
                                            <span className="font-medium">Recursos de Jogo</span>
                                        </button>
                                        <button
                                            onClick={() => handleDropdownSelect('herois')}
                                            className="landing-header__dropdown-item w-full text-left px-4 py-3 transition-all duration-200 flex items-center gap-3"
                                            role="menuitem"
                                        >
                                            <span className="font-medium">Heróis</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => scrollToSection('historia')}
                            className="landing-header__button landing-header__button--link px-4 py-2.5 font-medium text-lg"
                        >
                            História
                        </button>

                        <button
                            onClick={() => scrollToSection('cta')}
                            className="landing-header__button landing-header__button--link px-4 py-2.5 font-medium text-lg"
                        >
                            Jogue agora
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