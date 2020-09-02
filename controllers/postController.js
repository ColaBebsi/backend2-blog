const Post = require('../models/Post');

module.exports.create = async (req, res, next) => {
    const { title, content } = req.body;
    
    const post = await Post.create({ title, content });

    post.save((error) => {
        if (error) return next(error.message);
        res.status(201).json({ message: 'Post created!', post });
    });
}

module.exports.read = (req, res, next) => {
    const id = req.params.id;

    Post.findById(id, (error, post) => {
        if (error) return next(error.message);
        res.status(200).send(post);
    });
}

module.exports.readAll = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (error) {
        next({ status: 400, message: error.message })
    }
}

module.exports.update = (req, res, next) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, { $set: req.body }, (error, post) => {
        if (error) return next(error.message);
        res.status(200).json({ message: 'Post updated!', post});
    });
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;

    Post.findByIdAndRemove(id, (error, post) => {
        if (error) return next(error.message);
        res.status(200).json({ message: 'Post deleted!', post });
    });
}