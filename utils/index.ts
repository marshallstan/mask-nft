export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function pageReload() {
  window.location.reload()
}

export function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`
}
