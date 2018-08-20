# Installation
## Check your environment
Prior to installing Embark, you should have the following prerequisites on your machine:
#### NodeJS v8.12+ / NPM v6.4.1+
```
node version
> 8.12+
npm version
> 6.4.1
```
If you need to update Node, please [install `nvm`](https://github.com/creationix/nvm#installation) and install/use the LTS version. macOS/Linux commands provided for you below:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install --lts
nvm use lts
```
#### IPFS v0.4.17+
```
ipfs version
> 0.4.17+
```
[IPFS installation instructions](https://ipfs.io/docs/install/#installing-from-a-prebuilt-package), macOS/Linux command provided for you below:
```
tar xvfz go-ipfs.tar.gz
cd go-ipfs
./install.sh
ipfs init
```

#### Go-ethereum 1.8.15+
```
geth version
> 1.8.15+
```
If you need to [install `geth`](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum), you can use the below for macOS:
```
brew tap ethereum/ethereum
brew install ethereum
```
## Installing Embark 4.0.0-alpha
If you already have Embark installed, please run: 
```
embark version
```

Make sure the version is `4.0.0-alpha.1` or greater. If it’s not, re-install Embark by running:
```
npm install -g embark@next
```
> Do not use sudo when installing Embark

Re-run `embark version` to ensure we have `4.0.0-alpha.1` or higher. 

If you have not installed Embark at all, Embark can be installed by running
`npm install -g embark@next` (without sudo)