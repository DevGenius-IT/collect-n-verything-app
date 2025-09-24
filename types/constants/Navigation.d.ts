import NavItem from "../NavItem";

export type Navigation = {
  title: string;
  icon: string;
  tooltip: string;
  to?: string;
  subItems?: NavItem[];
};

export default Navigation;