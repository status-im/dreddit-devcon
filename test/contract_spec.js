
// our contract object to test
const DReddit = embark.require('Embark/contracts/DReddit');

// variables that will be updated in the tests
let accounts;
let postId;

// set up our config test parameters
config({
  contracts: {
    DReddit: {
      // would pass constructor args here if needed
    }
  }
}, (err, theAccounts) => {
  // this is the list of accounts our node / wallet controls.
  accounts = theAccounts;
});

// other test parameters
const ipfsHash = 'Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z';

// Embark exposes a global contract method as an alias
// for Mocha.describe
contract("DReddit contract", function () {

  this.timeout(0);

  it("should be able to create a post and receive it via contract event", async function () {    
    // TODO: 
  });

  it("post should have correct data", async function (){
    // TODO: 
  });

  it("one post should be registered", async function () {
    const n = await DReddit.methods.numPosts().call();
    assert.equal(n, 1);
  });

  it("should not be able to vote in an unexisting post", async function () {
    const userCanVote = await DReddit.methods.canVote("123").call();
    assert.equal(userCanVote, false);
  });

  it("should be able to vote in a post if account hasn't voted before", async function () {
    const userCanVote = await DReddit.methods.canVote(postId).call();
    assert.equal(userCanVote, true);
  });

  it("should be able to vote in a post", async function () {
    const receipt = await DReddit.methods.vote(postId, 1).send();
    const Vote = receipt.events.Vote;
    assert.equal(Vote.returnValues.voter, accounts[0]);
  });

  it("should't be able to vote twice", async function () {
    // TODO: 
  });

});