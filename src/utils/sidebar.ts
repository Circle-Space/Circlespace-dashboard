import { NavItemsType, SidebarItemsType } from "../types/sidebar";

// Function for dymically injecting children pages into a section of sidebar
export const injectChildren = (navItems: NavItemsType[], sectionTitle: string, pageTitle: string, children: SidebarItemsType[]) => {
  const navItemIdx = navItems.findIndex((item) => item.title === pageTitle)
  const sectionIdx = navItems[navItemIdx].pages.findIndex(p => p.title === sectionTitle)

  if (navItemIdx === -1 || sectionIdx === -1) return navItems

  let retVal = [...navItems]
  let curChildren = retVal[navItemIdx].pages[sectionIdx].children || []
  retVal[navItemIdx].pages[sectionIdx].children = [...curChildren, ...children]
  return retVal
}