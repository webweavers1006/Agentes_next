"use client"

import AppTempleate from "@/components/templeates/app-templeate";
import React from 'react';
import FormBuilder from '@/components/forms/builder/FormBuilder';
import config from '@/config/contact-form.config';
import schema, { stepSchemas } from '@/schema/contact-form.schema';
import useFormBuilder from '@/hooks/useFormBuilder';
import Steps from '@/components/ui/steps';
const Page = () => {
  const defaultValues = {};
  const methods = useFormBuilder({ schema, stepSchemas, defaultValues });

  const onSubmit = async (data) => {
    // convert file inputs if needed
    if (data.attachments && data.attachments.length && data.attachments[0] instanceof File) {
      const toAttachments = async (fileList) => {
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
      };
      data.attachments = await toAttachments(data.attachments[0]);
    }

    const res = await fetch('/api/submit-form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    console.log('submit result', json);
  };

  return (
    <AppTempleate title="Título de la página" subtitle="Subtítulo">
      <div className="p-4 rounded-2xl bg-white shadow-box mt-4">

          <Steps steps={config.steps || []} activeIndex={methods.stepIndex} onStepClick={(i) => methods.setStepIndex?.(i)} />
          <div className={"form-grid" + (config.showSummary ? "" : " no-summary")}>
            <div>
              <FormBuilder config={config} schema={schema} methods={methods} onSubmit={onSubmit} />
            </div>

            {config.showSummary && (
              <aside className="p-4">
                <h4 className="text-sm text-muted-foreground">Resumen</h4>
                <pre className="mt-2 text-xs">{JSON.stringify(methods.getValues(), null, 2)}</pre>
              </aside>
            )}
          </div>

      </div>
    </AppTempleate>
  );
};

export default Page;