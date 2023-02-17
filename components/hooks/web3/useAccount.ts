import useSWR from 'swr'
import { CryptoHookFactory } from '@/types/hooks'

type AccountHookFactory = CryptoHookFactory<string>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({ provider }) => params => {
  const swrRes = useSWR(
    provider ? 'web3/useAccount' : null,
    () => {
      return 'Test User'
    }
  )

  return swrRes
}
