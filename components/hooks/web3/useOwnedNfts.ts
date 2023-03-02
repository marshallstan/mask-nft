import { useCallback } from 'react'
import useSWR from 'swr'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { CryptoHookFactory } from '@/types/hooks'
import { Nft } from '@/types/nft'

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<void>
}
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory = ({ contract }) => () => {
  const { data, ...swr } = useSWR(
    contract ? 'web3/useOwnedNfts' : null,
    async () => {
      const nfts = [] as Nft[]
      const coreNfts = await contract!.getOwnedNfts()

      for (let i = 0; i < coreNfts.length; i++) {
        const item = coreNfts[i]
        const tokenURI = await contract!.tokenURI(item.tokenId)
        const metaRes = await fetch(tokenURI)
        const meta = await metaRes.json()

        nfts.push({
          price: parseFloat(ethers.utils.formatEther(item.price)),
          tokenId: item.tokenId.toNumber(),
          creator: item.creator,
          isListed: item.isListed,
          meta
        })
      }
      return nfts
    }
  )

  const _contract = contract
  const listNft = useCallback(async (tokenId: number, price: number) => {
    try {
      if (_contract) {
        const result = await _contract.placeNftOnSale(
          tokenId,
          ethers.utils.parseEther(price.toString()),
          {
            value: ethers.utils.parseEther(0.025.toString())
          }
        )

        await toast.promise(
          result!.wait(),
          {
            pending: 'Processing transaction',
            success: 'Item has been listed',
            error: 'Processing error'
          }
        )
      } else {
        alert('Waiting for connect! Please, refresh...')
      }
    } catch (e: any) {
      console.error(e.message)
    }
  }, [_contract])

  return {
    ...swr,
    listNft,
    data: data || []
  }
}
