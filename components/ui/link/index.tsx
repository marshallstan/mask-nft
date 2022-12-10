import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type LinkProps = {
  href: string
  children: ReactNode
  activeclass: string
  className: string
  [propName: string]: any
}

const ActiveLink = (
  { children, ...props }: LinkProps
) => {
  const { pathname } = useRouter()
  let className = props.className || ''
  let _defaultClass = `${className} text-gray-100`

  if (pathname === props.href) {
    className = `${className} text-indigo-400 ${props.activeclass}`
  } else {
    className = _defaultClass
  }

  const linkProps = {
    ...props,
    className
  }

  return (
    <Link {...linkProps}>
      {children}
    </Link>
  )
}

export default ActiveLink
