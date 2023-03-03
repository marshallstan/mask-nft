export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function pageReload() {
  window.location.reload()
}

export function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`
}

export function isValidNum(value: string | number) {
  return !isNaN(parseFloat(value as any)) && isFinite(value as any)
}
