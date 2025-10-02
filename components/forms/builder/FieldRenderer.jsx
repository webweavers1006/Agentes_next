"use client"

import React from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import TextField from '../fields/TextField';
import SelectField from '../fields/SelectField';
import CheckboxField from '../fields/CheckboxField';
import FileField from '../fields/FileField';
import ArrayField from '../fields/ArrayField';
import { evaluateVisibility } from '@/lib/formUtils';

const COMPONENT_MAP = {
  text: TextField,
  email: TextField,
  number: TextField,
  password: TextField,
  textarea: TextField,
  select: SelectField,
  checkbox: CheckboxField,
  file: FileField,
  array: ArrayField,
};

export default function FieldRenderer({ field }) {
  const FieldComponent = COMPONENT_MAP[field.type] || TextField;

  // watch dependent value(s) for conditional visibility
  const dependsOn = field.visibility?.dependsOn;
  const watching = useWatch({ name: dependsOn });
  const visible = evaluateVisibility(field.visibility, { [dependsOn]: watching });

  if (!visible) return null;

  // support either numeric span (field.span = 2) or size string (field.size = 'span2')
  const spanFromSize = typeof field.size === 'string' && field.size.startsWith('span')
    ? parseInt(field.size.replace('span', ''), 10)
    : null;
  const span = typeof field.span === 'number' ? field.span : spanFromSize || 1;

  const style = { gridColumn: `span ${span}` };

  return (
    <div className={`form-field-col span${span}`} style={style}>
      <FieldComponent field={field} />
    </div>
  );
}

FieldRenderer.propTypes = {
  field: PropTypes.object.isRequired,
};
