"use client";
import { useEffect } from "react";
import { showToast } from "@/lib/helpers/toast";

/**
 * Componente global de manejo de errores para la App Router de Next.js.
 * Muestra un toast con el mensaje de error y permite reintentar.
 *
 * @param {{ error: Error, reset: () => void }} props
 * @returns {JSX.Element}
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    if (error) {
      showToast(error.message || "Ocurrió un error inesperado", "error", {
        action: {
          label: "Reintentar",
          onClick: reset,
        },
      });
    }
  }, [error, reset]);

  // Render minimal, el toast es el feedback principal
  return null;
}
