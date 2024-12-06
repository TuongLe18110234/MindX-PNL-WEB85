const Post = require('../models/Post');
const Comment = require('../models/Comment')

//Get all Post
exports.getAllPosts = async (req, res, next) =>{
    try{
        //Tim toan bo bai post
        // populate: Lay id user va truy tim noi chua thong tin ve author
        // name filed want to get
        // _id is auto get, -_id to remove _id
        const posts = await Post.find({}).populate('author', 'name').select('content createdAt');
        res.status(200).json({
            status:'success',
            results: posts.length,
            data:{posts}
        })
    } catch(error){
        res.json(error);
    }
}

// Create one post
exports.createOnePost = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        //...req.body Lay toan bo thong tin trong req.body
        const post = await Post.create({...req.body, author: userId});

        res.status(200).json({
            status:'success',
            data:{post}
        })
    } catch(error){
        next(error);
    }
}

// Update one post
exports.updateOnePost = async (req, res, next) =>{
    try{
        const {postId} = req.params;

        // new: true phan hoi lai bai post da update
        const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidator: true});

        res.status(200).json({
            status:'success',
            data:{post}
        })
    } catch(error){
        next(error);
    }
}

// Delete one post
exports.deleteOnePost = async (req, res, next) =>{
    try{
        const {postId} = req.params;
        
        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            status:'success',
            massage: 'Post has been deleted'
        })
    } catch(error){
        next(error);
    }
}

// Get one post by Id
exports.getOnePostById = async (req, res, next) =>{
    try{
        const {postId} = req.params;

        // new: true phan hoi lai bai post da update
        const post = await Post.findOne({_id: postId});
        post.view += 1;
        await post.save();

        const comments = await Comment.find({post: postId}).populate('author', 'name').select('content createdAt');

        res.status(200).json({
            status:'success',
            data:{post, comments}
        })
    } catch(error){
        next(error);
    }
}

// Change voted
exports.updateListVotes = async (req, res, next) =>{
    try{
        const {postId} = req.params;
        const {userId} = req.user;
        const {action} = req.body

        // new: true phan hoi lai bai post da update
        var post = await Post.findOne({_id: postId});
        var votes = post.votes
        var vote = {
            "userId": userId,
            "action": action
        }

        var isAdd = true
        votes.forEach(function(item, index, array) {
            if (item.userId == vote.userId) {
                isAdd = false
                if (item.action == vote.action) {
                    votes.splice(index, 1)
                } else {
                    item.action = vote.action
                }
            }
        })
        if (isAdd) {
            votes.push(vote)
        }

        post.votes = votes;
        post = await Post.findByIdAndUpdate(postId, {...post}, {new: true, runValidator: true});

        res.status(200).json({
            status:'success',
            lenght: votes.lenght,
            data:{votes}
        })
    } catch(error){
        next(error);
    }
}