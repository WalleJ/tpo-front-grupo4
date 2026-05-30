export const validators = {
  required: (value: string) => value.trim().length > 0 || 'This field is required',
  email: (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value) || 'Invalid email format'
};