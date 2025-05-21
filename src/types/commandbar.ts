
export type FlowToggleButton = {
  name: string;
  icon: string;
  options: DropdownOption[];
}

export type DropdownOption = {
  value: string;
  label: string;
  icon: string;
  handleClick: () => void;
}