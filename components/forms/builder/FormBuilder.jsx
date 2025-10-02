"use client"

import React, { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import FieldRenderer from './FieldRenderer';
import StepNavigation from './StepNavigation';
import { getDefaultValuesFromConfig } from '@/lib/formUtils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

/**
 * FormBuilder
 * - Renders a configurable form based on a config object and a Zod schema.
 * - Uses react-hook-form via FormProvider for nested fields.
 */
export default function FormBuilder({ config, schema, methods, onSubmit, children }) {
  // methods may be provided (from useFormBuilder) or not
  const internalMethods = methods;

  const defaultValues = useMemo(() => getDefaultValuesFromConfig(config), [config]);

  if (!internalMethods) {
    // lightweight fallback: expect parent passes methods; this is a safety guard
    throw new Error('FormBuilder: please provide `methods` from useFormBuilder or initialize externally');
  }

  const { handleSubmit, stepIndex, next, prev, validateStep } = internalMethods;

  const currentStep = config?.steps?.[stepIndex] ?? null;

  return (
    <FormProvider {...internalMethods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {currentStep ? (
          <div key={currentStep.id} data-step-id={currentStep.id}>
            {currentStep.title && <h3 className='bg-primary text-white text-2xl font-semibold tracking-tight px-4 py-2 rounded-t-lg'><Label>{currentStep.title}</Label></h3>}
            <div className="form-fields-grid">
              {currentStep.fields.map((field) => (
                <FieldRenderer key={field.name} field={field} />
              ))}
            </div>

            <div className="form-footer">
              {stepIndex > 0 && (
                <Button variant="outline" type="button" onClick={() => prev()}>
                  Atrás
                </Button>
              )}

              {stepIndex < (config?.steps?.length ?? 1) - 1 ? (
                <Button
                  type="button"
                  onClick={async () => {
                    // validate current step fields before moving next
                    const fieldNames = currentStep.fields.map((f) => f.name);
                    const ok = await validateStep(fieldNames);
                    if (ok) next();
                  }}
                >
                  Siguiente
                </Button>
              ) : (
                <Button type="submit">{config?.submitLabel || 'Enviar'}</Button>
              )}
            </div>
          </div>
        ) : (
          <div>No hay steps configurados</div>
        )}

        {children}
      </form>
    </FormProvider>
  );
}

FormBuilder.propTypes = {
  config: PropTypes.object.isRequired,
  schema: PropTypes.object,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};
