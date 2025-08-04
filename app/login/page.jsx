/**
 * Página de inicio de sesión.
 *
 * Renderiza el formulario de login utilizando la configuración y el esquema definidos.
 *
 * @module app/login/page
 * @returns {JSX.Element} Componente de la página de login.
 */
'use client'
import { LoginForm } from "@/components/user/login-form"
import { loginFormConfig } from "./config/login-form.config"
import { loginFormSchema } from "@/schema/login-form.schema"
import { useLoginHandler } from "./hooks/use-login-handler"

/**
 * Componente principal de la página de login.
 *
 * @returns {JSX.Element} Estructura visual del formulario de login centrado en pantalla.
 */
export default function Page() {
  // Handler de login usando custom hook
  const onSubmit = useLoginHandler();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* Formulario de login con configuración y validación */}
        <LoginForm config={loginFormConfig} schema={loginFormSchema} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
