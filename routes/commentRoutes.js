const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/comments/:postId', commentController.create);
router.get('/comments/:id', commentController.read);
router.get('/comments', commentController.readAll);
router.patch('/comments/:id', commentController.update);
router.delete('/comments/:id', commentController.delete);

module.exports = router;