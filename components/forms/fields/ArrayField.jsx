"use client"

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function ArrayField({ field }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: field.name });

  return (
    <FormItem>
      <FormLabel>{field.label}</FormLabel>
      {fields.map((item, idx) => (
        <FormField
          key={item.id}
          control={control}
          name={`${field.name}.${idx}`}
          render={({ field: controllerField }) => (
            <>
              <FormControl>
                <div className="flex items-center gap-2">
                  <input
                    {...controllerField}
                    value={controllerField.value ?? ''}
                    className="form-input"
                  />
                  <Button variant="outline" size="sm" type="button" onClick={() => remove(idx)}>Eliminar</Button>
                </div>
              </FormControl>
              <FormMessage />
            </>
          )}
        />
      ))}
      <div className="mt-2">
        <Button type="button" onClick={() => append('')}>Añadir</Button>
      </div>
    </FormItem>
  );
}

ArrayField.propTypes = {
  field: PropTypes.object.isRequired,
};
