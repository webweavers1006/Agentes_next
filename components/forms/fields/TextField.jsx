"use client"

import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function TextField({ field }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: controllerField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                placeholder={field.placeholder}
                {...controllerField}
                value={controllerField.value ?? ''}
                className="form-textarea"
              />
            ) : (
              <Input
                id={field.name}
                {...controllerField}
                value={controllerField.value ?? ''}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                className="form-input"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

TextField.propTypes = {
  field: PropTypes.object.isRequired,
};
