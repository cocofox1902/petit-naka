import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour que le prochain rendu affiche l'UI de repli
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Enregistrer l'erreur dans un service de logging si nécessaire
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-8 border border-red-600">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Une erreur est survenue
              </h1>
              <p className="text-gray-400 mb-6">
                Désolé, quelque chose s'est mal passé. Veuillez réessayer.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-800 rounded border border-gray-700">
                <p className="text-red-400 text-sm font-mono mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-gray-400 text-xs">
                    <summary className="cursor-pointer mb-2">Détails techniques</summary>
                    <pre className="overflow-auto max-h-48 mt-2">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-red-700 hover:scale-105"
              >
                Retour à l'accueil
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105"
              >
                Recharger la page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

