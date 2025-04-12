'use client';

import AppLayout from '@/components/AppLayout';

export default function Dashboard() {
  return (
    <AppLayout>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-lilac-600 hover:bg-lilac-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <i className="fas fa-plus mr-2"></i> Novo Item
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600" title="Notificações">
              <i className="fas fa-bell"></i>
            </button>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Tarefas Pendentes</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-lilac-100 dark:bg-gray-700 flex items-center justify-center text-lilac-600 dark:text-lilac-400">
              <i className="fas fa-tasks text-xl"></i>
            </div>
          </div>
          <p className="text-sm text-lilac-600 dark:text-lilac-400 mt-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-lilac-600 dark:bg-lilac-400 rounded-full mr-2"></span>
            2 novas desde ontem
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Projetos Ativos</p>
              <h3 className="text-2xl font-bold mt-1">5</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-gray-700 flex items-center justify-center text-green-600 dark:text-green-400">
              <i className="fas fa-project-diagram text-xl"></i>
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-2"></span>
            1 concluído esta semana
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Mensagens</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <i className="fas fa-envelope text-xl"></i>
            </div>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
            4 não lidas
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Documentos</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-gray-700 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <i className="fas fa-file-alt text-xl"></i>
            </div>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-2"></span>
            3 atualizados hoje
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Atividade Recente</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="p-6 flex items-start">
            <div className="w-10 h-10 rounded-full bg-lilac-100 dark:bg-gray-700 flex items-center justify-center text-lilac-600 dark:text-lilac-400 mr-4">
              <i className="fas fa-check"></i>
            </div>
            <div>
              <p className="font-medium">Tarefa concluída</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">"Atualizar documentação do projeto" foi marcada como concluída</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 horas atrás</p>
            </div>
          </div>
          <div className="p-6 flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
              <i className="fas fa-comment"></i>
            </div>
            <div>
              <p className="font-medium">Novo comentário</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Maria comentou no relatório de vendas</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">5 horas atrás</p>
            </div>
          </div>
          <div className="p-6 flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-gray-700 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
              <i className="fas fa-user-plus"></i>
            </div>
            <div>
              <p className="font-medium">Novo membro</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Carlos foi adicionado ao time de desenvolvimento</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Ontem</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <a href="#" className="text-sm text-lilac-600 dark:text-lilac-400 hover:underline">Ver todas as atividades</a>
        </div>
      </div>
    </AppLayout>
  );
}