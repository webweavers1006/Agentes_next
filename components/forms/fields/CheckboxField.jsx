"use client"

import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function CheckboxField({ field }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: controllerField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <input
              type="checkbox"
              id={field.name}
              onChange={(e) => controllerField.onChange(e.target.checked)}
              checked={!!controllerField.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
};
