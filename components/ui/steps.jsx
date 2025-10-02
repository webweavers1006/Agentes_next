"use client"

import React from "react";

/**
 * Steps component
 * Props:
 * - steps: Array<{ id?: string|number, title: string, subtitle?: string }>
 * - activeIndex: number
 * - onStepClick?: (index) => void
 */
export default function Steps({ steps = [], activeIndex = 0, onStepClick }) {
  return (
    <nav className="step-bar mb-4" aria-label="Progreso del formulario">
      {steps.map((s, i) => (
        <React.Fragment key={s.id ?? i}>
          <button
            type="button"
            className={"step-circle" + (i === activeIndex ? " active" : "")}
            onClick={() => onStepClick?.(i)}
            aria-current={i === activeIndex ? "step" : undefined}
            aria-label={`Paso ${i + 1}: ${s.title}`}
          >
            {i + 1}
          </button>

          {i < steps.length - 1 && <div className="step-divider" aria-hidden />}
        </React.Fragment>
      ))}
    </nav>
  );
}
