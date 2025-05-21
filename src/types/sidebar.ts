export type SidebarItemsType = {
  href: string;
  title: string;
  icon: React.FC<any>;
  children?: SidebarItemsType[];
  badge?: string;
  featureKey?: string;
};

export type NavItemsType = {
  title: string;
  pages: SidebarItemsType[];
}