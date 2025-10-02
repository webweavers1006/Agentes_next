# Form Builder (Ejemplo)

Este directorio contiene un ejemplo de Form Builder configurable para Next.js usando React, `react-hook-form`, `zod` y componentes sencillos. Está pensado como punto de partida para crear formularios dinámicos a partir de una configuración y esquemas.

Archivos creados
- `components/forms/builder/*` - Componentes principales del builder y fields.
- `config/contact-form.config.js` - Configuración ejemplo del formulario.
- `schema/contact-form.schema.js` - Zod schema en JavaScript.
- `hooks/useFormBuilder.js` - Hook para inicializar react-hook-form con lógica de steps.
- `lib/formUtils.js` - Helpers (default values, condiciones).
- `pages/api/submit-form.js` - Endpoint de ejemplo para recibir submissions.

Dependencias (recomendadas)
- react-hook-form
- zod
- @hookform/resolvers
- prop-types

Instalación (PowerShell / Windows)
```powershell
npm install react-hook-form zod @hookform/resolvers prop-types
```

Cómo usar
- Importa `config/contact-form.config.js` y `schema/contact-form.schema.js`.
- Usa `useFormBuilder` para obtener `methods` y pásalo a `FormBuilder`.

Ejemplo mínimo de uso en una página Next.js:

```jsx
import React from 'react';
import FormBuilder from '../components/forms/builder/FormBuilder';
import config from '../config/contact-form.config';
import schema, { stepSchemas } from '../schema/contact-form.schema';
import useFormBuilder from '../hooks/useFormBuilder';

// Helper: convert FileList to attachments metadata (name/size/type/base64)
async function fileListToAttachments(fileList) {
  const out = [];
  for (const f of Array.from(fileList || [])) {
    const base64 = await new Promise((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result.split(',')[1]);
      reader.readAsDataURL(f);
    });
    out.push({ name: f.name, size: f.size, type: f.type, base64 });
  }
  return out;
}

export default function ContactPage() {
  const defaultValues = {};
  const methods = useFormBuilder({ schema, stepSchemas, defaultValues });

  const onSubmit = async (data) => {
    // if file inputs exist, convert to attachments metadata
    if (data.attachments && data.attachments.length && data.attachments[0] instanceof File) {
      data.attachments = await fileListToAttachments(data.attachments[0]);
    }

    const res = await fetch('/api/submit-form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    console.log(json);
  };

  return <FormBuilder config={config} schema={schema} methods={methods} onSubmit={onSubmit} />;
}
```

Pruebas
- Se incluye un test de ejemplo en `tests/FormBuilder.test.jsx` (esqueleto). Usa `@testing-library/react`.

Notas
- Este es un ejemplo inicial. Requiere mejoras para producción: accesibilidad completa, manejo avanzado de archivos, validación server-side, y tests más exhaustivos.
