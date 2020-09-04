const router = require('express').Router();
const postController = require('../controllers/postController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddleware');

router.post('/posts', postController.create);
router.get('/posts/:id', postController.read)
router.get('/posts', requireAuth, isAdmin, postController.readAll);
router.patch('/posts/:id', postController.update);
router.delete('/posts/:id', postController.delete);

module.exports = router;

// user jwt
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWY1MGYyOWJhZGQwZjMzNjhjNTQ2NDQ3IiwiaWF0IjoxNTk5MjEwMjIxLCJleHAiOjE1OTk0Njk0MjF9.uqfMphD-l58PQIRKWQJMr2ce2gPpw2eqCgVFryw3aAU

// admin jwt
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWY1MGYyYmZhZGQwZjMzNjhjNTQ2NDQ5IiwiaWF0IjoxNTk5MjEwMjkyLCJleHAiOjE1OTk0Njk0OTJ9.obcufu5F5jRGgPLkw3JsIzI3DtO81YuTIstQXVVXmn8