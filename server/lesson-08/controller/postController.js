import PostModel from '../model/posts.js';

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find(req.query);

        res.status(201).send({
            message: 'Get post successfuly!',
            data: posts,
            success: true
        })
    } catch (error) {
        next(error);
    }
};