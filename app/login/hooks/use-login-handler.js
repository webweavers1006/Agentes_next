import { useCallback } from "react";
import { showToast } from "@/lib/helpers/toast";


/**
 * Hook para manejar el login y mostrar toasts según el resultado.
 * @returns {function} Handler para onSubmit del formulario de login.
 */
export function useLoginHandler() {
  return useCallback(async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        showToast(result.message || "Error de validación", "error");
        return;
      }

      showToast("Has iniciado sesión correctamente.", "success");
    } catch (error) {
      showToast("No se pudo conectar con el servidor. Intenta más tarde.", "error");
      console.error(error);
    }
  }, []);
}
