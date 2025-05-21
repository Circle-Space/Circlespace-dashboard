import React, { useCallback } from "react";
import { Button, Spinner } from "react-bootstrap";
import { CommandBarButtonProps } from "./commandBarTypes";
import { debounce } from 'lodash';

const CommandBarButton: React.FC<CommandBarButtonProps> = ({
  handleClick,
  iconSvgSrc,
  name,
  iconSvgStyle = { width: "22px", height: "22px" },
  isLoading = false,
  loadingText = "wait....",
}) => {
  const debouncedHandleClick = useCallback(debounce(handleClick, 500, {
    leading: true,
    trailing: false
  }), [handleClick]);

  return (
    <div className="command-bar-btn-container">
      <Button
        variant="text"
        onClick={() => !isLoading && debouncedHandleClick()}
        className="command-bar-btn"
      >
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            <span className="icon-container">
              <img src={iconSvgSrc} style={iconSvgStyle} alt={name} />
            </span>
            <span className="command-btn-text">{name}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default CommandBarButton;
