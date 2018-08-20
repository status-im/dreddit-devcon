## Coding our contract
Let's start by modifying `./contracts/DReddit.sol` and see how Embark recompiles our contract whenever we update and save or file.

### Functions

#### Create a post
The `create` function is used to publish our posts. We need to add a new post to `posts[]` and emit an event indicating that a new post was created:

1. Add a `Post` to the `posts[]` array, asigning values to its attributes. For the `creationDate` use `block.timestamp`
```
uint postId = posts.length++;
posts[postId] = Post({
    creationDate: block.timestamp,
    description: _description,
    owner: msg.sender,
    upvotes: 0,
    downvotes: 0
});
```

2. Emit the `NewPost` event
```
emit NewPost(postId, msg.sender, _description);
```

#### Upvote/Downvote a post
We want to be able to asign a score to the posts. For that, let's work on the function `vote()` from which the users will be able to upvote or downvote each post. NOTE: this voting mechanism is very naive and we recomend that you do not use it in production because it is not Sybil resistant:

1. Determine if the post exists, and if we have already voted
```
Post storage p = posts[_postId];
require(p.creationDate != 0, "Post does not exist");
require(p.voters[msg.sender] == Ballot.NONE, "You already voted on this post");
```

You'll notice that we're using a new feature of Solidity here: `revert with reason`, which makes it significantly easier to debug your smart contracts. It should be fairly self-evident: just pass in a string stating the reason this `require` statement might fail as the second parameter so that you can track it easily. For a full discussion of this, go [here](https://github.com/ethereum/solidity/issues/1686).

2. Store the vote and update the post score
```
Ballot b = Ballot(_vote);
if (b == Ballot.UPVOTE) {
    p.upvotes++;
} else {
    p.downvotes++;
}
p.voters[msg.sender] = b;
```

3. Emit the event
````
emit Vote(_postId, msg.sender, _vote);
````

> Building a Sybil resistant voting mechanism using a Proof of Identity that takes into account the privacy of users is a great challenge. How would you solve this problem?

#### Determine if an user can vote for a post
The users needs to know somehow if they're able to vote on a post or not. There are two scenarios where a user should not be able to vote: a) The post doesn't exist, and b) The user already voted. This logic should be developed inside `canVote()`:

1. Determine if the posts exists
```
if(_postId > posts.length - 1) return false;
```

2. If the post exists, we will only allow voting if the user hasn't voted yet
```    
Post storage p = posts[_postId];    
return (p.voters[msg.sender] == Ballot.NONE);
```

#### Determine the user's vote
It's possible that a user would like to be reminded about what was their choice was for a post they voted on previously. Implement this in `getVote()`.
```
Post storage p = posts[_postId];
return uint8(p.voters[msg.sender]);
```
> Notice that, in the last two functions, the input and output values related to votes are `uint8` instead of an `enum`. This is because `enum`s are not a valid input/output value for functions, at least in the current version of Solidity.
