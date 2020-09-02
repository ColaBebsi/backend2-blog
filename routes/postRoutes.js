// const { Router } = require('express')
const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/post/create', postController.create);
router.get('/post/:id', postController.read)
router.get('/posts', postController.readAll);
router.patch('/post/update/:id', postController.update);
router.delete('/post/delete/:id', postController.delete);

module.exports = router;