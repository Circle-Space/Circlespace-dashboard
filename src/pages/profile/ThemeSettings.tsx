import React from "react";
import { THEME_OPTIONS } from "../../constants";
import useTheme from "../../hooks/useTheme";
import { Card } from "react-bootstrap";

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <Card.Body>
        <div className="row g-0 text-center mx-n1 mb-2">
        {THEME_OPTIONS.map(({ name, value }) => (
          <div className="col-6" key={value}>
            <label className="mx-1 d-block mb-1">
              <input
                className="settings-scheme-label"
                type="radio"
                name="theme"
                value={value}
                checked={theme === value}
                onChange={() => setTheme(value)}
              />
              <div className="settings-scheme">
                <div
                  className={`settings-scheme-theme settings-scheme-theme-${value}`}
                ></div>
              </div>
            </label>
            {name}
          </div>
        ))}
      </div>
      </Card.Body>
  </Card>
  )
}

export default ThemeSettings