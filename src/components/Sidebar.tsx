'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useStore } from '@/store/useStore';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode, isSidebarCollapsed, toggleSidebar } = useStore();

  const logout = () => {
    Cookies.remove('isLoggedIn');
    router.push('/');
  };

  return (
    <div className={`sidebar bg-white dark:bg-gray-800 shadow-lg h-screen fixed flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-lilac-500 flex items-center justify-center text-white">
            <i className="fas fa-cube"></i>
          </div>
          {!isSidebarCollapsed && (
            <span className="logo-text font-bold text-xl text-lilac-600 dark:text-lilac-400">
              Nebula
            </span>
          )}
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 dark:text-gray-400 hover:text-lilac-600 dark:hover:text-lilac-400"
          title="Toggle Sidebar"
        >
          <i className={`fas fa-${isSidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
        </button>
      </div>

      {/* Search */}
      {!isSidebarCollapsed && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-lilac-500"
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Link
          href="/dashboard"
          className={`menu-item flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            pathname === '/dashboard'
              ? 'bg-lilac-100 dark:bg-gray-700 text-lilac-700 dark:text-lilac-300'
              : 'hover:bg-lilac-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-lilac-600 dark:hover:text-lilac-400'
          }`}
        >
          <div className={`menu-icon w-6 h-6 flex items-center justify-center ${
            pathname === '/dashboard' ? 'text-lilac-600 dark:text-lilac-400' : ''
          }`}>
            <i className="fas fa-home"></i>
          </div>
          {!isSidebarCollapsed && (
            <span className={`menu-text ${pathname === '/dashboard' ? 'font-medium' : ''}`}>
              Home
            </span>
          )}
        </Link>

        <Link
          href="/kanban"
          className={`menu-item flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg ${
            pathname === '/kanban'
              ? 'bg-lilac-100 dark:bg-gray-700 text-lilac-700 dark:text-lilac-300'
              : 'hover:bg-lilac-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-lilac-600 dark:hover:text-lilac-400'
          }`}
        >
          <div className={`menu-icon w-6 h-6 flex items-center justify-center ${
            pathname === '/kanban' ? 'text-lilac-600 dark:text-lilac-400' : ''
          }`}>
            <i className="fas fa-tasks"></i>
          </div>
          {!isSidebarCollapsed && (
            <span className={`menu-text ${pathname === '/kanban' ? 'font-medium' : ''}`}>
              Tarefas
            </span>
          )}
        </Link>

        {!isSidebarCollapsed && (
          <>
            <Link
              href="#"
              className="menu-item flex items-center space-x-3 p-3 rounded-lg hover:bg-lilac-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-lilac-600 dark:hover:text-lilac-400"
            >
              <div className="menu-icon w-6 h-6 flex items-center justify-center">
                <i className="fas fa-chart-line"></i>
              </div>
              <span className="menu-text">Dashboard</span>
            </Link>

            <Link
              href="#"
              className="menu-item flex items-center space-x-3 p-3 rounded-lg hover:bg-lilac-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-lilac-600 dark:hover:text-lilac-400"
            >
              <div className="menu-icon w-6 h-6 flex items-center justify-center">
                <i className="fas fa-file-alt"></i>
              </div>
              <span className="menu-text">Relatórios</span>
            </Link>
          </>
        )}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* Dark/Light mode toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className="fas fa-moon text-gray-500 dark:text-lilac-400"></i>
            {!isSidebarCollapsed && (
              <span className="menu-text text-sm">Modo Escuro</span>
            )}
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              id="darkModeToggle"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              aria-label="Toggle Dark Mode"
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* User profile */}
        <div className="mt-6 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-lilac-100 dark:bg-gray-700 flex items-center justify-center">
            <i className="fas fa-user text-lilac-600 dark:text-lilac-400"></i>
          </div>
          {!isSidebarCollapsed && (
            <div className="menu-text">
              <p className="text-sm font-medium">Luiz Boaventura</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">luizinboaventura@gmail.com</p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className={`mt-4 w-full text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 ${
            isSidebarCollapsed ? 'flex justify-center' : ''
          }`}
        >
          <i className="fas fa-sign-out-alt"></i>
          {!isSidebarCollapsed && <span className="ml-2">Sair</span>}
        </button>
      </div>
    </div>
  );
}