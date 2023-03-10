import { Navbar } from '../index'
import { ReactNode } from 'react'

const BaseLayout = (
  { children }: { children: ReactNode }
): JSX.Element => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="pt-24 pb-16 bg-gray-50 overflow-hidden min-h-full">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
