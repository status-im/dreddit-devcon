## Unit testing
Now that we finished coding our contract, we can proceed to build unit testing for it. Embark generates javascript code for interacting with the contract `DReddit` and will make it possible to use it from both our unit tests and our dApp. There are some tests already implemented in `./test/contract_spec.js`, but we will add a couple that illustrate the most common test case scenarios

### We should be able to create a post and receive it via contract event
```
    let receipt = await DReddit.methods.create(web3.utils.fromAscii(ipfsHash)).send();
    const event = receipt.events.NewPost;
    postId = event.returnValues.postId;
    assert.equal(web3.utils.toAscii(event.returnValues.description), ipfsHash);
```
> This test demonstrates how to send a transaction to a contract. Since `create()` emits an event, we're able to access it in the transaction receipt, and we can use it to perform any assertion we need.


### The post should have correct data
```
    const post = await DReddit.methods.posts(postId).call();
    assert.equal(web3.utils.toAscii(post.description), ipfsHash);
    assert.equal(post.owner, accounts[0]);
```
> On this test, we read data from the chain, without generating a transaction. Notice we use `call()` instead of `send()` when invoking the `post()` function. A `call` will read the current state of our contract

### We should't be able to vote twice for the same post
```
    try {
      const receipt = await DReddit.methods.vote(postId, 1).send();
      assert.fail('should have reverted before');
    } catch (error){
        assert(error.message.search('revert') > -1, 'Revert should happen');
    }
```
> On this test we can see the pattern to evaluate a transaction that will revert. It involves using a try/catch block, and `assert.fail()` should be used to guarantee that it will fail the test if it reaches that line. Since `vote()` will revert, it throws an exception that we capture, and evaluate the error message to determine if the transaction reverted.

### Running the tests
To execute the tests and see their result, on a terminal session run:
```
embark test
```
### Results
The results of your test unit should be similar to the following:
```
  DReddit contract
    ✓ should be able to create a post and receive it via contract event
    ✓ should return 1 post
    ✓ post should have correct data
    ✓ should not be able to vote in an unexisting post report
    ✓ should be able to vote in a post if account hasn't voted before
    ✓ should be able to vote in a post
    ✓ should't be able to vote twice

  7 passing (163ms)


 > All tests passed
```
