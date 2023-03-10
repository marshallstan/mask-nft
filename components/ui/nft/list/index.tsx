import { useState } from 'react'
import { useListedNfts } from '@components/hooks/web3'
import NftItem from '../item'

const NftList = () => {
  const { nfts } = useListedNfts()
  const [isRequesting, setIsRequesting] = useState(false)

  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {nfts.data?.map(nft =>
        <div key={`${nft.meta.image}${nft.tokenId}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <NftItem
            item={nft}
            buyNft={nfts.buyNft}
            isRequesting={isRequesting}
            setIsRequesting={setIsRequesting}
          />
        </div>
      )}
    </div>
  )
}

export default NftList
