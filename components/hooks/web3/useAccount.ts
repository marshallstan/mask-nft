import useSWR from 'swr'

export const hookFactory = (deps: any) => (params: any) => {
  const swrRes = useSWR('web3/useAccount', () => {
    console.log('deps ===> ' + deps)
    console.log('params ===> ' + params)
    return 'Test User'
  })

  return swrRes
}

export const useAccount = hookFactory({ ethereum: null, provider: null })
