pragma solidity ^0.4.24;

// @notice Contract to create posts
contract DReddit {

    enum Ballot { NONE, UPVOTE, DOWNVOTE }

    struct Post {
        uint creationDate;   
        bytes description;   
        address owner;
        uint upvotes;  
        uint downvotes;
        mapping(address => Ballot) voters;
    }

    Post[] public posts;

    event NewPost (
        uint indexed postId,
        address owner,
        bytes description
    );

    event Vote(
        uint indexed postId,
        address voter,
        uint8 vote
    );

    // @notice Number of posts created
    // @return Num of posts
    function numPosts()
        public
        view
        returns(uint)
    { 
        return posts.length;
    }

    // @notice Create Post
    // @param _description IPFS hash of the content of the post
    function create(bytes _description)
        public
    {
        // TODO: 
    }

    // @notice Vote on a post
    // @param _postId Id of the post to up/downvote
    // @param _vote Vote selection: 0 -> none, 1 -> upvote, 2 -> downvote
    function vote(uint _postId, uint8 _vote)
        public
    {
        // TODO:
    }

    // @notice Determine if the sender can vote on a post
    // @param _postId Id of the post
    // @return bool that indicates if the sender can vote or not
    function canVote(uint _postId)
        public
        view
        returns (bool)
    {
        // TODO:
    }

    // @notice Obtain vote for specific post
    // @param _postId Id of the post
    // @return uint that represents the vote: 0 -> none, 1 -> upvote, 2 -> downvote
    function getVote(uint _postId)
        public
        view
        returns (uint8)
    {
        // TODO:
    }

}
