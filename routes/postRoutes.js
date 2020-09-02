const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/posts', postController.create);
router.get('/posts/:id', postController.read)
router.get('/posts', postController.readAll);
router.patch('/posts/:id', postController.update);
router.delete('/posts/:id', postController.delete);

module.exports = router;