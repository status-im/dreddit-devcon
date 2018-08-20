## Testnet Deployment
Now that we finished building our dApp, we need to deploy it. We'll deploy our contracts to the ropsten testnet, and our dApp resources to IPFS using Embark's upload feature.

### Configuring our deployment ethereum account
Let's edit`./config/contracts.js` to add a testnet section that will contain our contract deployment settings. Embark supports different types of configurations for [deployment](https://embark.status.im/docs/contracts.html#Deployer-Account) of smart contracts. For this particular tutorial, we will use a private key that contains Ropsten ETH:
```
"testnet": {
    dappConnection: [
      "$WEB3"
    ],
    deployment: {
        accounts: [{
            privateKey: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" // <-- Change this line for using your private key, mnemonics, o private key file. See docs for examples
        }]
}
```
> Notice that on `dappConnection` we only specified `$WEB3`. This is because we will use the web3 provider that is automatically injected by Status / Metamask / Mist. However, this might change in the future with [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102)

### Storage
For storage, we will use the [Infura](https://infura.io) IPFS Gateway to upload our dApp files. This is configured in `./config/storage.js`. In this config file, we need to add a `testnet` section and configure both the `upload`, and `dappConnection` for handling the file uploads during the dApp runtime.

```
  testnet: {
    upload: {
      host: "ipfs.infura.org",
      port: 5001,
      protocol: "https"
    },
    dappConnection: [
      {
        provider: "ipfs",
        protocol: "https",
        host: "ipfs.infura.io",
        port: 5001,
        getUrl: "https://ipfs.infura.io/ipfs/"
      }
    ]
  }
```

### 3... 2... 1... Deploy!
Once you've done all the configuration, we'll proceed to execute `embark blockchain testnet` in one terminal session and `embark upload testnet` in a separate one. Embark will proceed to compile our contracts, deploy them, and prepare the files for our dApp.

> Notice we are running `embark blockchain testnet` in a separate session in order to be able to see the sync state of our geth light node. The first time this is executed, geth will download a number of headers of the mined blocks, so the initial deployment of our contracts might take longer than usual. After our node synchronizes, our deployments will be faster.

Once the upload process concludes, execute `ipfs daemon` to share the dApp files with the IPFS network, and you would be able to access your dApp in the browser using the URL shown by Embark's upload process. You can access now your dApp via Status, or a Browser using Metamask.
