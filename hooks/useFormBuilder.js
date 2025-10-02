'use client';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * useFormBuilder
 * - Inicializa react-hook-form con opcional zod schema
 * - Maneja steps (index) y helpers para navegación
 */
export default function useFormBuilder({ schema, stepSchemas = [], defaultValues = {}, mode = 'onSubmit' } = {}) {
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode
  });

  const [stepIndex, setStepIndex] = useState(0);

  const goTo = (i) => setStepIndex(i);
  const next = () => setStepIndex((s) => s + 1);
  const prev = () => setStepIndex((s) => Math.max(0, s - 1));

  /**
   * validateStep: triggers validation for a list of field names (returns boolean)
   */
  const validateStep = async (fieldNames = [], stepIndexToValidate = null) => {
    // If stepSchemas provided and a schema exists for the step, use it to validate the full data subset
    if (Array.isArray(stepSchemas) && stepIndexToValidate !== null && stepSchemas[stepIndexToValidate]) {
      try {
        const data = methods.getValues();
        // validate against step schema
        stepSchemas[stepIndexToValidate].parse(data);
        return true;
      } catch (err) {
        // zod throws, map errors back to react-hook-form
        if (err.errors) {
          const zodErrors = err.errors;
          zodErrors.forEach((e) => {
            if (e.path && e.path.length) {
              const name = e.path.join('.');
              methods.setError(name, { type: 'manual', message: e.message });
            }
          });
        }
        return false;
      }
    }

    if (!fieldNames || fieldNames.length === 0) return true;
    const results = await methods.trigger(fieldNames);
    return results;
  };

  return useMemo(() => ({
    ...methods,
    stepIndex,
    goTo,
    next,
    prev,
    validateStep
  }), [methods, stepIndex]);
}
