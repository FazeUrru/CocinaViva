import { Apple } from 'lucide-react';
import { Logo } from '../components/Logo';

interface AuthPageProps {
  onLogin: (user: any) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const handleSocialLogin = (provider: string) => {
    onLogin({
      name: `Usuario de ${provider}`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: provider.charAt(0)
    });
  };

  return (
    <div className="fixed inset-0 z-[100] w-full h-full bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-12 md:mt-0">
        <div className="flex justify-center mb-6">
          <Logo size={64} />
        </div>
        <h2 className="mt-2 text-3xl font-black text-gray-900">
          Bienvenido a CocinaViva
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Inicia sesión para acceder a todas tus recetas y ajustes.
        </p>
        <div className="mt-2 flex items-center justify-center flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">v2.0.0 ESTABLE</span>
          <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-bold flex items-center gap-1">
            <Apple className="w-3 h-3" /> Disponible en iOS
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-1">
            📺 Smart TV Ready
          </span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl border border-gray-100">

          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-gray-700">Por seguridad, el registro es obligatorio.</h3>
            <p className="text-xs text-gray-500 mt-1">Elige tu plataforma favorita para continuar</p>
          </div>

          {/* Social Login Obligatorio */}
          <div className="space-y-4">
            <button onClick={() => handleSocialLogin('Google')} className="w-full flex justify-center items-center gap-3 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
              Continuar con Google
            </button>

            <button onClick={() => handleSocialLogin('Apple')} className="w-full flex justify-center items-center gap-3 py-3 border border-gray-300 rounded-xl shadow-sm bg-black text-sm font-semibold text-white hover:bg-gray-900 transition-colors">
              <Apple className="w-5 h-5 text-white" fill="currentColor" />
              Continuar con Apple
            </button>

            <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex justify-center items-center gap-3 py-3 border border-transparent rounded-xl shadow-sm bg-[#1877F2] text-sm font-semibold text-white hover:bg-[#166fe5] transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Continuar con Facebook
            </button>

            <button onClick={() => handleSocialLogin('X')} className="w-full flex justify-center items-center gap-3 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Continuar con X
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Al registrarte aceptas nuestros Términos de Servicio y la Política de Privacidad de CocinaViva.
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          © 2026 CocinaViva.com — Todos los derechos reservados.<br />
          Proyecto de Código Abierto.
        </p>
      </div>
    </div>
  );
}
