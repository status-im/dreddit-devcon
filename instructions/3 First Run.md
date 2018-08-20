## First run
Now let’s run our website quickly to see what embark will do for us.
```
embark run
```
You should see the Embark console and it's components. 
* *Contracts* - the top left shows which contracts are deployed and their address. 
* *Modules* loaded and running - the top right shows the status of the loaded modules running (or not running) in Embark. 
* *Log* - the middle shows log output. 
* *Console* - on the bottom row there is a console that will let us interact with `EmbarkJS`, our contracts, `web3`, and `ipfs` to name a few. Try it out by typing `help` to see available commands.

### Embark output
You’ll notice from the logs and from the modules that Embark has started Go-ethereum and IPFS processes, compiled and deployed our contract, and webpacked our website for us. 
> The contract warnings in orange will disappear once we update our contract.

### Cockpit tour
Embark v4 introduces the Cockpit, a web-based UI for interacting with Embark and all components of your dApp.
* Light and dark mode theme
* Dashboard
    * Show dashboard logs (per process)
    * Console: interact with web3, DReddit, EmbarkJS (storage, comms, contracts, ENS)
    * `help`: list of available commands
    * `DReddit`: show a JSON view of the code-generated `DReddit` contract object
    * `web3.eth.getAccounts().then(console.log)`
    * List of deployed contracts
        * Drill-down in to a contract takes us to the Explorer > Contracts page where we can interact with our contract.
            * Create post
            * View post
* Explorer
    * Overview
        * Accounts - list of accounts controlled by the node
        * Blocks - latest blocks
        * Transactions - latest transactions
        * Accounts - list accounts controlled by the node
        * Drill down - view all txs
        * Blocks - list all blocks by most recent
            * Drill down - view all txs in a block
        * Contracts - list all contracts deployed on the node
            * Drill down - interact, details (ABI, bytecode), transactions for the contract with filter on function/event, debugger (replay and debug a tx hash - WIP)
        * Transactions - list all txs on the node
            * Drill down - decode the tx
    * Deployment
        * Embark - embark will watch your contract changes and redeploy for you
        * Injected web3 - can use metamask to estimate contract deployment gas, and deploy with metamask
* Editor - web-based editor that allows us to save and delete files in our dApp. Obviously we can use our IDE, but this is a convenient way to view our code and make small changes.
    * When a contract is selected, we can interact with the contract methods, view abi/bytecode, view transactions with a function/event filter, debugger (WIP), and browser preview.
* Utils
    * Ethereum units converter
    * Whisper interaction
    * ENS - register subdomains, lookup addresses and resolve names
    * Sign & Verify - sign a message using an account controlled by the node. Verify a message was signed using an account.
    * Transaction decode - decode the parameters of a tx

### Take a tour of the barebones DReddit site
The website has several features that *are not yet hooked up to our contract*, but let’s take a look around at the website anyway. Launch `http://localhost:8000` in your browser.

Functionality we need to hook up:
* Create a post
* Upvote / Downvote a post
* Search and view posts

Next, we'll hook this functionality up to a contract.