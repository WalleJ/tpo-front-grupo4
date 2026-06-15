export const validators = {
  required: (value) => value.trim().length > 0 || 'This field is required',
  email: (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value) || 'Invalid email format'
};
