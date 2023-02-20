export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function pageReload() {
  window.location.reload()
}
