interface Option {
  value: string;
  label: string;
}

// custom-select.types.ts
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectTheme {
  trigger?: {
    bg?: string;
    text?: string;
    border?: string;
    hover?: string;
    focus?: string;
  };
  content?: { bg?: string; border?: string; className?: string };
  item?: { hover?: string; focus?: string; text?: string };
  addButton?: { bg?: string; text?: string; border?: string; hover?: string };
  dropDownIcon?: {
    color?: string;
  };
}

export interface DashboardCustomSelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onAddClick?: () => void;
  buttonText?: string;
  theme?: SelectTheme;
}
