export type Role = 'ADMIN' | 'USER';

export type ThemeMode = 'light' | 'dark';

export interface BaseEntity {
  id: number | string;
}

export interface OptionItem {
  label: string;
  value: string;
}