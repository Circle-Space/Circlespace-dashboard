import React from "react";

import { SIDEBAR_POSITION, SIDEBAR_BEHAVIOR } from "../constants";
import { NavItemsType } from "../types/sidebar";
import { AuthUser } from "../types/auth";

const initialState = {
  isOpen: true,
  setIsOpen: (open: boolean) => {},
  setPosition: (position: string) => {},
  setBehavior: (behavior: string) => {},
  position: SIDEBAR_POSITION.LEFT,
  behavior: SIDEBAR_BEHAVIOR.STICKY,
  items: [] as NavItemsType[],
  injectDevicesIntoSMS: (user: AuthUser) => {},
  resetSidebar: () => new Promise<void>(() => {}),
};

const SidebarContext = React.createContext(initialState);

export default SidebarContext;
