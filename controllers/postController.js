const Post = require('../models/Post');

module.exports.create = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.create({ title, content });
        res.status(201).json({ message: 'Post created!', post });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports.read = async (req, res, next) => {
    const id = req.params.id;

    return await Post.findById(id, (error, post) => {
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

module.exports.update = async (req, res, next) => {
    const id = req.params.id;

    return await Post.findByIdAndUpdate(id, { $set: req.body }, (error, post) => {
        if (error) return next(error.message);
        res.status(200).json({ message: 'Post updated!', post});
    });
}

module.exports.delete = async (req, res, next) => {
    const id = req.params.id;

    return await Post.findByIdAndRemove(id, (error, post) => {
        if (error) return next(error.message);
        res.status(200).json({ message: 'Post deleted!', post });
    });
}