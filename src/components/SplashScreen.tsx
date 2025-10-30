import { useEffect, useState } from 'react';
import logo from './assets/Logo.png'; // ✅ path is correct, keep lowercase in code

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);import { useEffect, useState } from "react";
import logo from "../assets/Logo.png"; // ✅ Adjust path as per your structure

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade-out
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500
        ${isVisible ? "opacity-100" : "opacity-0"}
        bg-white dark:bg-[#0a0a0a] text-black dark:text-white`}
    >
      <div className="text-center animate-scale-in">
        {/* Logo section */}
        <div className="mb-6 flex justify-center relative">
          <img
            src={logo}
            alt="Arackamannil Printers Logo"
            className="w-28 h-28 object-contain animate-pulse"
          />
          <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full animate-pulse" />
        </div>

        {/* Title and text */}
        <h1 className="text-4xl font-heading font-bold mb-2">
          Arackamannil Printers
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-body">
          We Print What You Think
        </p>
        <p className="text-gray-600 dark:text-gray-300 font-body">
          Since 1972
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center animate-scale-in">
        {/* ✅ Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src={logo} // ✅ lowercase 'logo'
              alt="Arackamannil Printers Logo"
              className="w-24 h-24 animate-pulse object-contain"
            />
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Arackamannil Printers
        </h1>
        <p className="text-gray-500">We Print What You Think</p>
        <p className="text-gray-500">Since 1972</p>
      </div>
    </div>
  );
};

export default SplashScreen;
