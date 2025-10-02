
/**
 * Panel component para mostrar un panel con título, subtítulo y contenido opcional.
 * Permite personalizar el color de fondo y el color de texto mediante props.
 *
 * @param {Object} props
 * @param {string} props.title - Título principal del panel.
 * @param {string} props.subtitle - Subtítulo del panel.
 * @param {React.ReactNode} [props.children] - Contenido opcional a mostrar en el panel (por defecto muestra el logo).
 * @param {string} [props.bgClass="bg-primary"] - Clase de fondo TailwindCSS (ej: "bg-primary", "bg-white", "bg-gray-100").
 * @param {string} [props.textClass="text-white"] - Clase de texto para el título (ej: "text-white", "text-black").
 * @param {string} [props.subtitleClass="text-gray-300"] - Clase de texto para el subtítulo.
 */
const Panel = ({
  title,
  subtitle,
  children,
  bgClass = "bg-primary",
  textClass = "text-white",
  subtitleClass = "text-gray-300"
}) => {
  return (
    <div className={`${bgClass} pt-10 pb-10 px-5 rounded-2xl md:col-span-2 relative shadow-box`}>
      <div className="flex items-center">
        {children ? (
          <div className="flex-shrink-0">{children}</div>
        ) : (
          <img className="mask mask-squircle size-13" src={'sapi.png'} />
        )}
        <div className="flex flex-col justify-center ml-4">
          <h2 className={`text-3xl ${textClass} font-semibold tracking-tight`}>
            {title}
          </h2>
          <p className={`text-base/7 font-semibold ${subtitleClass}`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Panel;