export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  props?: {
    [key: string]: unknown;
  };
}
