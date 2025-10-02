export default {
  id: 'contactForm',
  title: 'Contacto',
  submitLabel: 'Enviar',
  showSummary: false,
  steps: [
    {
      id: 'personal',
      title: 'Datos personales',
      fields: [
        { name: 'firstName', type: 'text', label: 'Nombre', placeholder: 'Tu nombre', default: '', span: 1},
        { name: 'lastName', type: 'text', label: 'Apellido', placeholder: 'Tu apellido', default: '', span: 1},
        { name: 'email', type: 'email', label: 'Email', placeholder: 'correo@ejemplo.com', default: '', span: 2}
      ]
    },
    {
      id: 'message',
      title: 'Mensaje',
      fields: [
        { name: 'reason', type: 'select', label: 'Motivo', options: [{ label: 'Soporte', value: 'support' }, { label: 'Ventas', value: 'sales' }], size: 'span1' },
        { name: 'message', type: 'textarea', label: 'Mensaje', placeholder: 'Escribe tu mensaje...', default: '', size: 'span2' },
        { name: 'attachments', type: 'file', label: 'Adjuntos', repeatable: true, size: 'span2' }
      ]
    }
  ]
};
