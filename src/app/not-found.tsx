import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-lilac-600 dark:text-lilac-400">404</div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Página não encontrada
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-lilac-600 hover:bg-lilac-700 rounded-lg transition-colors duration-200"
        >
          <i className="fas fa-home mr-2"></i>
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  )
}