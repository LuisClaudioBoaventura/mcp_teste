'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Cookies.set('isLoggedIn', 'true', { expires: 7 });
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="bg-black bg-opacity-70 backdrop-blur-sm w-full h-full absolute"></div>
        
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 w-full max-w-md z-50 glow-effect transform transition-all duration-300 hover:scale-[1.01]">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center pulse-animation floating">
              <i className="fas fa-user-astronaut text-white text-4xl"></i>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-purple-400 mb-2 mt-6">Bem-vindo de volta</h1>
          <p className="text-gray-400 text-center mb-8">Faça login para acessar sua conta</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-purple-500"></i>
                </div>
                <input id="email" type="email" required className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Digite seu e-mail" />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-purple-500"></i>
                </div>
                <input id="password" type="password" required className="block w-full pl-10 pr-12 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Digite sua senha" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" title="Mostrar ou ocultar senha">
                  <i className="fas fa-eye-slash text-purple-500 hover:text-purple-400 cursor-pointer"></i>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-800" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Lembrar-me</label>
              </div>
              
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">Esqueceu a senha?</a>
            </div>
            
            <button type="submit" className="btn-hover w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center">
              <span>Entrar</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Não tem uma conta? 
              <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">Cadastre-se</a>
            </p>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Ou continue com</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button type="button" title="Login com Google" className="flex items-center justify-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <i className="fab fa-google text-red-400 text-xl"></i>
              </button>
              <button type="button" title="Login com Facebook" className="flex items-center justify-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <i className="fab fa-facebook-f text-blue-400 text-xl"></i>
              </button>
              <button type="button" title="Login com Apple" className="flex items-center justify-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <i className="fab fa-apple text-gray-200 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}