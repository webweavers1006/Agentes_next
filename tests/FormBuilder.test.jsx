import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormBuilder from '../components/forms/builder/FormBuilder';
import config from '../config/contact-form.config';
import schema from '../schema/contact-form.schema';
import useFormBuilder from '../hooks/useFormBuilder';

test('renders contact form fields', () => {
  const methods = useFormBuilder({ schema, defaultValues: {} });
  const onSubmit = jest.fn();

  render(<FormBuilder config={config} schema={schema} methods={methods} onSubmit={onSubmit} />);

  expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
});
