import type { NavItem } from "~/types"

const navigation : NavItem[] = [
  {
    title: 'dashboard.title',
    icon: 'Package2',
    to: '/admin',
    tooltip: 'dashboard.tooltip',
  },
  {
    title: 'users.title',
    icon: 'Users2',
    to: '/admin/users',
    tooltip: "users.tooltip",
  },
]

export { navigation }