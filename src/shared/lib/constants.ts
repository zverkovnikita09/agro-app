export const Routes = {
  default: "/",
  main: "/main",
  profile:(id?: string) => {
    return `/main/profile/${id}`
  },
  docs: (id?: string) => {
    return `/main/profile/${id}/docs`
  },
  editProfile: (id?: string) => {
    return `/main/profile/edit/${id}`
  },
  application: (id?: string) => {
    return `/main/application/${id}`
  },
  checkList: "/main/check-list",
  search: "/main/search",
  myCheckList: "/main/check-list/my",
  login: "/login",
  filters: "/main/filters",
  sort: "/main/sort",
} as const;