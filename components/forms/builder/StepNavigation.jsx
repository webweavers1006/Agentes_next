"use client"

import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

export default function StepNavigation({ config }) {
  const { formState } = useFormContext();

  return (
    <div className="step-navigation">
      <button type="submit">{config?.submitLabel || 'Enviar'}</button>
      {formState.isSubmitting && <span style={{ marginLeft: 8 }}>Enviando...</span>}
    </div>
  );
}

StepNavigation.propTypes = {
  config: PropTypes.object,
};
