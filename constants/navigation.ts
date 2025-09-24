import type { Navigation } from "~/types/constants"

const navigation : Navigation[] = [
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