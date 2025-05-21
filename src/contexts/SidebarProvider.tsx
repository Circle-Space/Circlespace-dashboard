import React, { useReducer, useState } from 'react';
import { Phone } from 'react-feather';
import dashboardItems from '../components/sidebar/dashboardItems';
import { SIDEBAR_BEHAVIOR, SIDEBAR_POSITION } from '../constants';
import useSettingsState from '../hooks/useSettingsState';
import { ActionMap } from '../types/actions';
import { AuthUser } from '../types/auth';
import { NavItemsType, SidebarItemsType } from '../types/sidebar';
import { injectChildren } from '../utils/sidebar';
import SidebarContext from './SidebarContext';
import {

  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const faIconSolidColor = 'rgba(233, 236, 239, 0.5)';
const faIconSize = '20px';

const faIcons = {

  Comments: () => <FontAwesomeIcon icon={faComments} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
};

interface SidebarProviderType {
  children: React.ReactNode;
}

export type SidebarState = {
  items: NavItemsType[];
};

type SidebarActionTypes = {
  ['INJECT_DEVICES']: { children: SidebarItemsType[] };
  ['RESET_SIDEBAR']: undefined;
};

const initialState = {
  items: dashboardItems,
};

const SidebarReducer = (state: SidebarState, action: ActionMap<SidebarActionTypes>[keyof ActionMap<SidebarActionTypes>]) => {
  if (action) {
    switch (action.type) {
      case 'INJECT_DEVICES':
        return {
          ...state,
          items: injectChildren([...state.items], 'SMS', 'EngagePro', action.payload.children),
        };
      case 'RESET_SIDEBAR':
        return initialState;
      default:
        return state;
    }
  } else {
    return state;
  }
};

function SidebarProvider({ children }: SidebarProviderType) {
  const [state, dispatch] = useReducer(SidebarReducer, initialState);
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useSettingsState('sidebarPosition', SIDEBAR_POSITION.LEFT);
  const [behavior, setBehavior] = useSettingsState('sidebarBehavior', SIDEBAR_BEHAVIOR.STICKY);

  const injectDevicesIntoSMS = (user: AuthUser) => {
    const devicesChildren: SidebarItemsType[] =
      user && user.Features.includes('SMS')
        ? user.Devices.filter(d => d.DeviceType === 'Virtual Phone').map(d => ({
            title: d.PhoneNumber,
            icon: faIcons.Comments,
            href: `/services/devices?${d.Id}`,
            featureKey: 'SMS',
          }))
        : [];
    dispatch({ type: 'INJECT_DEVICES', payload: { children: devicesChildren } });
  };

  const resetSidebar = () => {
    return new Promise<void>(resolve => {
      dispatch({ type: 'RESET_SIDEBAR' });
      resolve();
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        ...state,
        injectDevicesIntoSMS,
        resetSidebar,
        isOpen,
        setIsOpen,
        position,
        setPosition,
        behavior,
        setBehavior,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
