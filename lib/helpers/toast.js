import { toast } from "sonner";

/**
 * Muestra un toast global con configuración predefinida y permite personalización.
 *
 * @param {string} message - Mensaje principal a mostrar en el toast.
 * @param {('success'|'error'|'info'|'warning'|'loading'|'default')} [type="info"] - Tipo de toast, afecta el color, icono y posición.
 * @param {Object} [options={}] - Opciones adicionales para personalizar el toast (sobrescriben la configuración base).
 * @param {string} [options.description] - Descripción secundaria a mostrar debajo del mensaje principal. Por defecto, la fecha y hora actual.
 * @param {Object} [options.action] - Acción opcional a mostrar en el toast (botón Cerrar por defecto).
 * @param {Object} [options.style] - Estilos CSS en línea para el toast.
 * @param {number} [options.duration] - Duración en milisegundos que el toast estará visible.
 * @param {Object} [options.classNames] - Clases CSS para personalizar partes del toast.
 * @returns {void}
 *
 * @example
 * // Toast de éxito con configuración por defecto
 * showToast("Login exitoso", "success");
 *
 * @example
 * // Toast de error sin descripción
 * showToast("Error de autenticación", "error", { description: undefined });
 *
 * @example
 * // Toast informativo con duración personalizada
 * showToast("Mensaje info", "info", { duration: 8000 });
 *
 * @example
 * // Toast de advertencia con clase personalizada
 * showToast("Advertencia", "warning", { classNames: { description: "text-yellow-700" } });
 */
export function showToast(message, type = "info", options = {}) {
  // Genera la fecha y hora actual como descripción por defecto
  const now = new Date();
  const description = now.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Determina la posición del toast según el tipo
  let position;
  if (type === "error") {
    position = "top-right";
  } else if (type === "success") {
    position = "top-left";
  }

  // Opciones base para el toast
  const opts = {
    description,
    action: {
      label: "Cerrar",
      onClick: () => console.log("Cerrar"),
    },
    ...(position && { position }),
    classNames: {
      description: 'text-red-900',
      ...(options.classNames || {})
    },
    duration: options.duration ?? 50000000, // 5000 ms por defecto
    ...options,
  };

  // Llama al método específico de Sonner según el tipo para mostrar el icono y color correcto
  switch (type) {
    case "success":
      toast.success(message, opts);
      break;
    case "error":
      toast.error(message, opts);
      break;
    case "warning":
      toast.warning ? toast.warning(message, opts) : toast(message, opts);
      break;
    case "info":
      toast.info ? toast.info(message, opts) : toast(message, opts);
      break;
    case "loading":
      toast.loading ? toast.loading(message, opts) : toast(message, opts);
      break;
    default:
      toast(message, opts);
  }
}
