// Configuración de los campos del formulario de login
export const loginFormConfig = {
  title: "Inicio de sesión",
  description: "Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta",
  fields: [
    {
      id: "email",
      label: "Correo",
      type: "email",
      placeholder: "ejemplo@ejemplo.com",
      required: true,
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      required: true,
    },
  ]
};
