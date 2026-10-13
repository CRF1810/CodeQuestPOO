import React from 'react';
import logo from '../../Assets/logo.png';

const Footer = () => (
    <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex justify-center mb-8">
                <img src={logo} alt="CodeQuest POO Logo" className="h-20 w-auto" />
            </div>

            <div className="border-t border-gray-800 mb-6" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                <p>Copyright 2025</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-emerald-400 transition-colors duration-300">
                        Privacy Policy
                    </a>
                    <span aria-hidden="true">|</span>
                    <a href="#" className="hover:text-emerald-400 transition-colors duration-300">
                        Terms &amp; Conditions
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
