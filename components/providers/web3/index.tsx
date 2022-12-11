import { createContext, ReactNode, useContext, useState } from 'react'

const Web3Context = createContext<any>(null)

const Web3Provider = (
  { children }: { children: ReactNode }
) => {
  const [web3Api, setWeb3Api] = useState({ test: 'hello provider' })

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}

export default Web3Provider
