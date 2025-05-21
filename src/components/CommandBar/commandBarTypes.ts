export interface CommandBarProps {
  handleSave?: () => void;
  handleSaveAndClose?: () => void;
  isSavingAndClosing?: boolean;
  handleEdit?: () => void;
  handleNew?: () => void;
  handleClear?: () => void;
  handleBack?: () => void;
  handleDelete?: () => void;
  handleQuickView?: () => void;
  handleHelp?: () => void;
  searchOptions?: SearchProps;
  flowToggleButtonPrimary?: CommandBarFlowProps | undefined;
  flowToggleButtonSecondary?: CommandBarFlowProps | undefined;
  barBackgroundColor?: string;
  buttons?: CommandBarButtonProps[];
}

export type SearchProps = {
  handleSearch: (searchVal: string) => void;
  handleClearSearch: () => void;
  searchPlaceholder: string;
}

export type CommandBarButtonProps = {
  name: string;
  handleClick: () => void;
  iconSvgSrc?: string;
  iconSvgStyle?: React.CSSProperties; // Add style property
  isLoading?: boolean;
  loadingText?: string;
};

export type CommandBarFlowProps = {
  name: string;
  dropDownTitle?: string;
  handleClick?: () => void;
  iconSvgSrc?: string;
  iconSvgStyle?: React.CSSProperties; // Add style property
  dropDownButtons?: CommandBarButtonProps[];
};
