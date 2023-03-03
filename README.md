This is a [Next.js](https://nextjs.org/) project.

## Overview

Mask-nft has dependencies on multiple technologies.

* [Pinata](https://app.pinata.cloud/) - store images, and NFT metadata
* [Ganache](https://trufflesuite.com/ganache/) - private Blockchain, to run application locally

## To run the app

1. run `npm install` to install dependencies

2. In the root folder of the application create a `.env.development` file with following content:

```
NEXT_PUBLIC_NETWORK_ID=5777
NEXT_PUBLIC_TARGET_CHAIN_ID=1337
NEXT_PUBLIC_PINATA_DOMAIN=https://gateway.pinata.cloud

SECRET_COOKIE_PASSWORD={your custom at least 32 characters long password!}

PINATA_API_KEY={your api key from pinata}
PINATA_SECRET_API_KEY={your api secret key from pinata}

INFURA_SEPOLIA_URL={your sepolia test url(If you want to deploy this on test chain)}
```

* (your api pinata key has to allow `pinFileToIPFS` and `pinJSONToIPFS` rules)

3. Then migrate a contract to Ganache, contract can be found in the `contracts` folder. It's called `NftMarket.sol`

* To migrate the contract run `truffle migrate` in the terminal while Ganache network is set up and running.

* Do not forget to link `trufle-config.js` with Ganache, just go to `config` and click `Add Project`

* `keys.json` must be created if you want to deploy to Sepolia, if not, just remove import of `keys.json`
  from `trufle-config.js` and also comment out `sepolia` configuration

4. Now everything is set up, and you can test out the app.

* Run `npm run dev` in the terminal. App will run at `localhost:3000`
