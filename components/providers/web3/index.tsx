import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { createDefaultState, createWeb3State, loadContract, Web3State } from './utils'
import { pageReload } from '@utils'
import { NftMarketContract } from '@/types/nftMarketContract'

const handleAccount = async () => {
  const isLocked = !(await window.ethereum._metamask.isUnlocked())
  if (isLocked) pageReload()
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on('chainChanged', pageReload)
  ethereum.on('accountsChanged', handleAccount)
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener('chainChanged', pageReload)
  ethereum?.removeListener('accountsChanged', handleAccount)
}

const Web3Context = createContext<Web3State>(createDefaultState())

const Web3Provider = (
  { children }: { children: ReactNode }
) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const contract = await loadContract('NftMarket', provider)

        const signer = provider.getSigner()
        const signedContract = contract.connect(signer)

        setTimeout(() => setGlobalListeners(window.ethereum), 500)

        setWeb3Api(createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract: signedContract as unknown as NftMarketContract,
          isLoading: false
        }))
      } catch (e) {
        console.error('Please, install web3 wallet')
        setWeb3Api(api => createWeb3State({
          ...api as any,
          isLoading: false
        }))
      }
    }

    initWeb3()

    return () => removeGlobalListeners(window.ethereum)
  }, [])

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}

export function useHooks() {
  const { hooks } = useWeb3()
  return hooks
}

export default Web3Provider
