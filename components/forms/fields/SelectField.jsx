"use client"

import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function SelectField({ field }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: controllerField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <select
              id={field.name}
              {...controllerField}
              value={controllerField.value ?? ''}
              className="form-select"
            >
              <option value="">--</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
};
