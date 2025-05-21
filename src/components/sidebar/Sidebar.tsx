import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import Logo from "./../Logo";
import SidebarNav from "./SidebarNav";
import { SidebarItemsType } from "../../types/sidebar";
import useConfigModule from "../../hooks/useConfigModule";

interface SidebarProps {
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
  open?: boolean;
  showFooter?: boolean;
}

const Sidebar = ({ items, showFooter = true }: SidebarProps) => {
  const { isOpen } = useSidebar();
  const { configModule } = useConfigModule();

  // Filter items based on configModule
  const filteredItems = items.filter((item) => {
    const config = configModule.find(
      (configItem) => configItem.name === item.title
    );
    return config ? config.enabled : true;
  });

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <Logo />
            <br />
            <span className="align-middle me-3">SMS Management</span>
          </a>
          <SidebarNav items={filteredItems} />
          {/* {!!showFooter && <SidebarFooter />} */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
