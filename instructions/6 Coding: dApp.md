## Coding our dApp
Let's use our DReddit JS Object, and the `EmbarkJS` API to interact with our contract and IPFS. While we update our files, notice how Embark watches and recompiles any asset we modify when we save the changes. Navigate to the `app/js/components` folder and follow along from there:

###### `Create.js`

1. Start by importing EmbarkJS, web3 and the contract object:
```
import EmbarkJS from 'Embark/EmbarkJS';
import web3 from 'Embark/web3';
import DReddit from 'Embark/contracts/DReddit';

```
> Both EmbarkJS and web3 are normally imported whenever there's a need to interact with web3 technologies. You'll see these imports present in both `App.js` and `Post.js`

2. Update the `handleClick` event that is triggered when you press the `Publish` button. This will save the post on IPFS, and invoke our contract. We need to obtain a gas estimate and add our post using the contract's `create` function.

Save the content of the post in IPFS
```
const ipfsHash = await EmbarkJS.Storage.saveText(JSON.stringify(textToSave));
```

Then, estimate the gas needed to execute the `create` function

```
const {create} = DReddit.methods;    
const toSend = await create(web3.utils.toHex(ipfsHash));
const estimatedGas = await toSend.estimateGas();
```

Finally, generate the transaction
```
const receipt = await toSend.send({from: web3.eth.defaultAccount, 
                                   gas: estimatedGas + 1000});
```
> Notice that we added 1000 wei to the estimated gas. There are situations where the estimated gas is incorrect depending on the state of the contract, or if you're deleting items from an array. Adding some extra wei helps avoid running into unexpected Out of Gas exceptions.

###### `App.js`


1. Edit `componentDidMount()`. Execute `this._loadPosts()` as soon as EmbarkJS initializes:
```
EmbarkJS.onReady(() => {
    this._loadPosts();
});
```
> `onReady()` is used if you want to execute any action that uses EmbarkJS or web3 as soon as the page loads.

2. Edit `_loadPosts`. Extract the functions `posts` and `numPosts` from the contract in order to read the posts content:

```
const {posts, numPosts} = DReddit.methods;
```

Using `numPosts` to obtain the number of posts our contract has in storage:
```
const total = await numPosts().call();
```

And then, inside the loop, invoke `posts` to fetch each post individually:

```
const currentPost = posts(i).call();
```
> Notice that we aren't using `await` here. It's not good practice to use `await` inside a loop. It's better to load all the promises inside an array, and then, call `Promise.all()` on this array.

###### `Post.js`

1. Edit `_loadAttributes` so that we can `get` the post from IPFS:
```
 const ipfsText = await EmbarkJS.Storage.get(ipfsHash);
```

Convert the text retrieved from IPFS into a JSON object and populate `title` and `content`:
```
const jsonContent = JSON.parse(ipfsText);

const title = jsonContent.title;
const content = jsonContent.content;
```

Determine if the user can vote on this post:
```
const canVote = await DReddit.methods.canVote(this.props.id).call();
```

2. Edit `_vote`. Estimate the cost of invoking the `vote` function of our DReddit contract:
```
const {vote} = DReddit.methods;
const toSend = vote(this.props.id, choice);
const estimatedGas = await toSend.estimateGas();
```

Send the transaction:
```
const receipt = await toSend.send({gas: estimatedGas + 1000});
```

#### Check the dApp
Open a browser, navigate to http://localhost:8000 and admire your creation! Also try to fix any bug we may have introduced.
