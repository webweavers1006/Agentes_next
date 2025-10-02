/**
 * formUtils
 * - Helpers for mapping config to default values and evaluating simple conditions
 */

export function getDefaultValuesFromConfig(config) {
  if (!config) return {};
  if (!config.steps) return {};
  const out = {};
  config.steps.forEach((step) => {
    step.fields.forEach((f) => {
      out[f.name] = f.default ?? '';
    });
  });
  return out;
}

export function evaluateVisibility(condition, values = {}) {
  if (!condition) return true;
  const { dependsOn, equals, operator = 'eq' } = condition;
  if (!dependsOn) return true;

  // support nested paths like 'address.country'
  const value = dependsOn.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), values);

  switch (operator) {
    case 'eq':
      return value === equals;
    case 'ne':
      return value !== equals;
    case 'in':
      return Array.isArray(equals) && equals.includes(value);
    case 'nin':
      return Array.isArray(equals) && !equals.includes(value);
    case 'exists':
      return value !== undefined && value !== null && value !== '';
    default:
      return value === equals;
  }
}
