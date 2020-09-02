const Comment = require('../models/Comment');

module.exports = {
    create: async (req, res) => {
        const postId = req.params.postId;
        const { content } = req.body;

        const comment = await Comment.create({ postId, content });

        comment.save((error) => {
            if (error) return next(error.message);
            res.status(201).json({ message: 'Comment created!', comment });
        })
    },
    read: async (req, res) => {
        const id = req.params.id;

        return await Comment.findById(id, (error, comment) => {
            if (error) return next(error.message);
            res.status(200).json({ comment })
        });
    },
    readAll: async (req, res, next) => {
        try {
            const comments = await Comment.find({});
            res.status(200).json({ comments });
        } catch (error) {
            next({ status: 400, message: error.message });
        }
    },
    update: async (req, res, next) => {
        const id = req.params.id;

        return await Comment.findByIdAndUpdate(id, { $set: req.body }, (error, comment) => {
            if (error) return next(error.message);
            res.status(200).json({ message: 'Comment updated!', comment })
        });
    },
    delete: async (req, res, next) => {
        const id = req.params.id;

        return await Comment.findByIdAndDelete(id, (error, comment) => {
            if (error) return next(error.message);
            res.status(200).json({ message: 'Comment deleted', comment });
        });
    }
}