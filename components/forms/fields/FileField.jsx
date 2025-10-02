"use client"

import React, { useRef, useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function FileField({ field }) {
  const { control } = useFormContext();

  function FileDropzone({ controllerField, field }) {
    const inputRef = useRef(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const onZoneClick = useCallback(() => {
      inputRef.current?.click();
    }, []);

    const onKeyDown = useCallback((e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inputRef.current?.click();
      }
    }, []);

    const handleFiles = useCallback((files) => {
      controllerField.onChange(files);
    }, [controllerField]);

    const onDragEnter = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    }, []);

    const onDragOver = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      setIsDragActive(true);
    }, []);

    const onDragLeave = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    }, []);

    const onDrop = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      const files = e.dataTransfer?.files;
      if (files && files.length) {
        handleFiles(files);
      }
    }, [handleFiles]);

    return (
        <FormItem>
        <FormLabel>{field.label}</FormLabel>
        <FormControl>
          <div>
            <div
              role="button"
              tabIndex={0}
              className={`file-dropzone ${isDragActive ? 'dragover' : ''}`}
              onClick={onZoneClick}
              onKeyDown={onKeyDown}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <input
                ref={inputRef}
                id={field.name}
                type="file"
                multiple={!!field.repeatable}
                onChange={(e) => handleFiles(e.target.files)}
                className="sr-only"
              />

              <div className="flex flex-col items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm">Arrastra el archivo aquí o haz clic para seleccionar</div>
              </div>
            </div>

            {/* show selected files (if any) */}
            {controllerField.value && controllerField.value.length > 0 && (
              <div className="mt-2 text-sm">
                {Array.from(controllerField.value).map((f, i) => (
                  <div key={i}>{f.name} <span className="text-muted">({Math.round(f.size/1024)} KB)</span></div>
                ))}
              </div>
            )}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: controllerField }) => (
        <FileDropzone controllerField={controllerField} field={field} />
      )}
    />
  );
}

FileField.propTypes = {
  field: PropTypes.object.isRequired,
};
