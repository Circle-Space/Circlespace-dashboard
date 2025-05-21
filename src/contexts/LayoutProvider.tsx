import React, { useState } from "react";

import { LAYOUT } from "../constants";
import useSettingsState from "../hooks/useSettingsState";

import LayoutContext from "./LayoutContext";

interface LayoutProviderType {
  children: React.ReactNode;
}

function LayoutProvider({ children }: LayoutProviderType) {
  const [layout, setLayout] = useSettingsState("layout", LAYOUT.FLUID);
  const [navbarTitle, setNavbarTitle] = useState("")
  return (
    <LayoutContext.Provider
      value={{
        navbarTitle,
        setNavbarTitle,
        layout,
        setLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutProvider;
