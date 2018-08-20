# DReddit Template clone and explore
Now that we have Embark installed properly, let’s grab the DReddit dApp template that we will use as the skeleton of our dApp. This template is a website built using React (don't worry if you don't know React, we are not focussing on this part). 

## Let's go
First, let's make sure our `pwd` is in the parent folder of where we want our dApp to be. For example, if we want our dApp to live in our home directory (`~`), make sure we're in our home directory:
```
cd ~
```
Now, let's download the template in to a `~/dtwitter` folder:
```
embark new dtwitter --template status-im/dreddit-devcon
cd dtwitter
```
Embark will create new dApp called `dtwitter` and install all dependencies for us!
Let’s take a moment to open the template in our favorite IDE and take a tour of the file structure of a standard Embark dApp:
* `/app` - contains all our assets for the website. These will get webpacked according to our settings in `/embark.json`.
* `/config` - contains all our configuration
    * `blockchain.js` - configures options for running geth
    * `communication.js` - configures whisper options
    * `contracts.js` - configures options for deploying contracts from Embark, as well as the connection to make to geth from the dApp
    * `namesystem.js` - configures ENS support (coming in 3.2)
    * `storage.js` - configures decentralised storage for IPFS and Swarm. Includes a section for uploading the dApp as well as a dApp connection that can be used in the dApp.
    * `webserver.js` - configuration options for the webserver that serves the dApp during development.
* `/contracts` - contains our contacts
* `/test` - contains our mocha tests for testing our contracts
* `embark.json` - configures file locations, webpack options, and library versions to use