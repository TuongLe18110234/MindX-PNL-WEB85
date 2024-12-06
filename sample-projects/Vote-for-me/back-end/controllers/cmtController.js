const Comment = require('../models/Comment')

// Create one comment
// exports.getAllComments = async (req, res, next) =>{
//     try{
//         const comments = await Comment.find();

//         res.status(200).json({
//             status:'success',
//             results: comments.length,
//             data:{comments}
//         })
//     } catch(error){
//         res.json(error);
//     }
// }

// Get all comment
exports.getAllComments = async (req, res, next) =>{
    try{
        Comment.find({}, function (err, comments) {
            if (err) return handleError(err);

            res.status(200).json({
                status:'success',
                results: comments.length,
                data:{comments}
            })
        });
    } catch(error){
        res.json(error);
    }
}


//Get all Comment By Post Id
exports.getAllCommentsByPostId = async (req, res, next) =>{
    try{
        const {postId} = req.params;

        const comments = await Comment.find({post: postId});

        res.status(200).json({
            status:'success',
            results: comments.length,
            data:{comments}
        })
    } catch(error){
        res.json(error);
    }
}

// Create one comment
exports.createOneComment = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        //...req.body Lấy toàn bộ thông tin trong req.body
        const comment = await Comment.create({...req.body, author: userId});

        res.status(200).json({
            status:'success',
            data:{comment}
        })
    } catch(error){
        next(error);
    }
}

// Update one comment
exports.updateOneComment = async (req, res, next) =>{
    try{
        const {cmtId} = req.params;

        // new: true phan hoi lai bai post da update
        const comment = await Comment.findByIdAndUpdate(cmtId, {...req.body},
                                {new: true, runValidator: true});

        res.status(200).json({
            status:'success',
            data:{comment}
        })
    } catch(error){
        next(error);
    }
}

// Delete one comment
exports.deleteOneComment = async (req, res, next) =>{
    try{
        const {cmtId} = req.params;
        
        await Comment.findByIdAndDelete(cmtId);

        res.status(200).json({
            status:'success',
            massage: 'Comment has been deleted'
        })
    } catch(error){
        next(error);
    }
}


// Get one comment by Id
exports.getOneCommentById = async (req, res, next) =>{
    try{
        const {cmtId} = req.params;

        // Populate lấy nam của author thông qua ObjectId 
        const comment = await Comment.findOne({_id: cmtId})
                    .populate('author', 'name').select('content post createdAt');

        res.status(200).json({
            status:'success',
            data:{comment}
        })
    } catch(error){
        next(error);
    }
}
    