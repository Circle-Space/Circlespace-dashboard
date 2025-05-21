import React from "react";

import { LAYOUT } from "../constants";

const initialState = {
  navbarTitle: "",
  setNavbarTitle: (val: string) => {},
  layout: LAYOUT.FLUID,
  setLayout: (layout: string) => { },
};

const LayoutContext = React.createContext(initialState);

export default LayoutContext;
