import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import {
  Alarm, ArrowLeftCircle, ArrowRight, BagCheck, Calendar2Check, Calendar2Date, CalendarCheck, Cash, ChatDots, ChatLeftText, CheckCircle,
  ClockHistory, Collection, Diagram3Fill, Eraser, FilterSquare, HandThumbsDown, HandThumbsUp, PlusCircle, QuestionCircle, Save, SaveFill,
  Search, SendCheck, TelephoneX, Trash, XCircle,
} from 'react-bootstrap-icons';
import Select, { components, StylesConfig } from 'react-select';
import { DropdownOption, FlowToggleButton } from '../../types/commandbar';

// Define the type for the icons (React components)
type IconComponent = React.ComponentType;

const iconMap: Record<string, IconComponent> = {
  ArrowLeftCircle,
  PlusCircle,
  FilterSquare,
  QuestionCircle,
  ChatDots,
  Alarm,
  Diagram3Fill,
  ArrowRight,
  CheckCircle,
  Eraser,
  SaveFill,
  ClockHistory,
  ChatLeftText,
  Collection,
  HandThumbsUp,
  HandThumbsDown,
  Cash,
  Calendar2Check,
  Calendar2Date,
  SendCheck,
  CalendarCheck,
  BagCheck,
  XCircle,
  TelephoneX,
  Save,
  Trash,
};

interface CommandBarProps {
  handleSave?: () => void;
  handleSaveAndClose?: () => void;
  isSavingAndClosing?: boolean;
  handleEdit?: () => void;
  handleNew?: () => void;
  handleClear?: () => void;
  handleBack?: () => void;
  handleDelete?: () => void;
  handleEntityFilter?: () => void;
  handleHelp?: () => void;
  searchOptions?: {
    handleSearch: (value: string) => void;
    handleClearSearch: () => void;
    searchPlaceholder: string;
  };
  flowToggleButtons?: FlowToggleButton[];
  buttons?: Array<{
    handleClick: () => void;
    icon: string;
    name: string;
  }>;
}


const getIconComponent = (iconName: string): IconComponent => {
  // Look up the icon in the map. If not found, default to QuestionCircle

  return iconMap[iconName] || QuestionCircle;
};


////import * as Icon from 'react-bootstrap-icons';
// const getIconComponent = (iconName: string) => {
//   console.log(iconName);
//   return (Icon as any)[iconName] || Icon.QuestionCircle;
// };

const CommandButton: React.FC<{
  onClick: () => void;
  icon: string;
  name: string;
  disabled?: boolean;
}> = ({ onClick, icon, name, disabled }) => {
  const IconComponent = getIconComponent(icon);
  return (
    <button className="command-bar-btn" onClick={onClick} disabled={disabled}>
      <IconComponent className="command-btn-icon" />
      <span className="command-btn-text">{name}</span>
    </button>
  );
  };

const customStyles: StylesConfig<DropdownOption, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(66, 66, 66, 0.2)',
    borderRadius: '8px',
    boxShadow: state.isFocused ? '0 0 4px rgba(0, 0, 0, 0.3)' : 'none',
    '&:hover': {
      backgroundColor: 'rgba(245, 245, 223, 0.8)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f8f9fa' : 'transparent',
    color: state.isSelected ? 'white' : '#212529',
    '&:active': {
      backgroundColor: '#007bff',
    },
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.175)',
    zIndex: 9999,
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 99999,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: 'rgb(66, 66, 66)',
  }),
};

const CustomControl = ({ children, ...props }: any) => {
  const IconComponent = getIconComponent(props.selectProps.icon);
  return (
    <components.Control {...props}>
      <IconComponent className="command-btn-icon" />
      {children}
    </components.Control>
  );
};

const CustomOption = ({ children, ...props }: any) => {
  const IconComponent = getIconComponent(props.data.icon);
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconComponent className="dropdown-item-icon" />
        <span>{children}</span>
      </div>
    </components.Option>
  );
};

const DropdownButton: React.FC<{ button: FlowToggleButton }> = ({ button }) => {
  const [value, setValue] = useState<DropdownOption>()

  console.log(button.name, value)
  return (
    <div className="dropdown-container">
      <Select
        id={button.name}
        key={button.name}
        options={button.options}
        components={{
          Control: CustomControl,
          Option: CustomOption,
        }}
        value={value}
        icon={button.icon}
        placeholder={button.name}
        onChange={option => {
          if(option) {
            option.handleClick()
            setValue(option)
          }
        }}
        className="command-bar-select"
        classNamePrefix="command-bar-select"
        menuPortalTarget={document.body} 
      />
    </div>
  );
};

interface CommandBarProps {
  handleSave?: () => void;
  handleSaveAndClose?: () => void;
  isSavingAndClosing?: boolean;
  handleEdit?: () => void;
  handleNew?: () => void;
  handleClear?: () => void;
  handleBack?: () => void;
  handleDelete?: () => void;
  handleEntityFilter?: () => void;
  handleHelp?: () => void;
  searchOptions?: {
    handleSearch: (value: string) => void;
    handleClearSearch: () => void;
    searchPlaceholder: string;
  };
  flowToggleButtons?: FlowToggleButton[];
  buttons?: Array<{
    handleClick: () => void;
    icon: string;
    name: string;
  }>;
  debounceTime?: number;
}

const CommandBar: React.FC<CommandBarProps> = ({
  handleSave,
  handleSaveAndClose,
  isSavingAndClosing,
  handleEdit,
  handleNew,
  handleClear,
  handleBack,
  handleDelete,
  handleEntityFilter,
  handleHelp,
  searchOptions,
  flowToggleButtons = [],
  buttons = [],
  debounceTime = 500,
}) => {
  const [searchValue, setSearchValue] = useState('');

  // Create debounced versions of the handlers
  const debouncedHandleSave = useCallback(
    debounce(() => {
      if (handleSave) handleSave();
    }, debounceTime),
    [handleSave, debounceTime],
  );

  const debouncedHandleSaveAndClose = useCallback(
    debounce(() => {
      if (handleSaveAndClose) handleSaveAndClose();
    }, debounceTime),
    [handleSaveAndClose, debounceTime],
  );

  const debouncedHandleSearch = useCallback(
    debounce((value: string) => {
      if (searchOptions?.handleSearch) searchOptions.handleSearch(value);
    }, debounceTime),
    [searchOptions, debounceTime],
  );

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue.trim()) {
      event.preventDefault();
      debouncedHandleSearch(searchValue.trim());
    }
    if (event.key === 'Backspace' && searchValue.length <= 1) {
      setSearchValue('');
      event.preventDefault();
      searchOptions?.handleClearSearch();
    }
  };

  return (
    <div className="command-bar">
      <div className="command-bar-btn-container">
        {handleBack && <CommandButton onClick={handleBack} icon="ArrowLeftCircle" name="Back" />}
        {handleBack && <div className="vert-divider" />}
        {handleClear && <CommandButton onClick={handleClear} icon="Eraser" name="Clear" />}
        {handleEdit && <CommandButton onClick={handleEdit} icon="PencilSquare" name="Edit" />}
        {handleDelete && <CommandButton onClick={handleDelete} icon="Trash" name="Delete" />}
        {handleSave && <CommandButton onClick={debouncedHandleSave} icon="Save" name="Save" />}
        {handleSaveAndClose && (
          <CommandButton onClick={debouncedHandleSaveAndClose} icon="SaveFill" name="Save & Close" disabled={isSavingAndClosing} />
        )}
        {handleNew && <CommandButton onClick={handleNew} icon="PlusCircle" name="New" />}
        {flowToggleButtons.length > 0 && <div className="vert-divider" />}
        {flowToggleButtons.map((button, index) => (
          <DropdownButton key={button.name} button={button} />
        ))}
        {buttons.map((button, index) => (
          <CommandButton key={button.name} onClick={button.handleClick} icon={button.icon} name={button.name} />
        ))}
      </div>

      <div className="command-bar-btn-container">
        {handleEntityFilter && (
          <>
            <CommandButton onClick={handleEntityFilter} icon="FilterSquare" name="Custom Filter" />
            <div className="vert-divider" />
          </>
        )}
        {handleHelp && <CommandButton onClick={handleHelp} icon="QuestionCircle" name="Help" />}
        {searchOptions && (
          <div className="command-search-container">
            <input
              className="command-search-input"
              onKeyDown={handleSearchKeyDown}
              onChange={e => setSearchValue(e.target.value)}
              placeholder={searchOptions.searchPlaceholder}
              value={searchValue}
            />
            <Search className="command-search-icon" onClick={() => debouncedHandleSearch(searchValue)} />
            {searchValue && (
              <XCircle
                className="command-clear-icon"
                onClick={() => {
                  setSearchValue('');
                  searchOptions.handleClearSearch();
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandBar;