import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Button } from 'react-bootstrap';

import DropDownArrow from '../../assets/img/commandbar/dropdown-arrow.svg';
import FlowIcon from '../../assets/img/commandbar/flow.svg';
import CommandBarButton from './CommandBarButton';
import { CommandBarFlowProps } from './commandBarTypes';

const CommandBarButtonDropDown: React.FC<CommandBarFlowProps> = ({
  handleClick,
  dropDownTitle,
  name,
  iconSvgSrc,
  iconSvgStyle,
  dropDownButtons = [],
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the correct type

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (handleClick) {
      handleClick();
    }
  };

  const handleDropDownItemClick = () => {
    setShowDropdown(false);
  };

  const buttonStyle = showDropdown ? { backgroundColor: "rgb(245, 245, 223)" } : {};

  const buttonImgSrc = iconSvgSrc ? iconSvgSrc : FlowIcon;
  const buttonImgStyle = iconSvgStyle ? iconSvgStyle : { width: "22px", height: "22px" };

  return (
    <div className="command-bar-btn-container" ref={dropdownRef}>
      <Button
        variant="text"
        onClick={toggleDropdown}
        className="command-bar-btn"
        style={buttonStyle}
      >
        <span className="icon-container">
          <img src={buttonImgSrc} style={buttonImgStyle} alt={name} />
        </span>
        <span className="command-btn-text">{name}</span>
        <span className="icon-container-left">
          <img
            src={DropDownArrow}
            style={{ width: "20px", height: "20px" }}
            alt={name}
          />
        </span>
      </Button>

      {showDropdown && (
        <div className="command-bar-dropdown">
          {dropDownTitle && (
            <>
              <div className="dropdown-title">{dropDownTitle}</div>
              <hr />
            </>
          )}

          {dropDownButtons.map((button, index) => (
            <CommandBarButton
              key={index}
              handleClick={() => {
                button.handleClick();
                handleDropDownItemClick(); // Close dropdown when an option is clicked
              }}
              iconSvgSrc={button.iconSvgSrc}
              name={button.name}
              iconSvgStyle={button.iconSvgStyle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandBarButtonDropDown;
