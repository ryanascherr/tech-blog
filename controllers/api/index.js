const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//Tells the system to go into the userRoutes.js if /users is in the file path
router.use('/users', userRoutes);
//Tells the system to go into the postRoutes.js if /posts is in the file path
// router.use('/posts', postRoutes);
//Tells the system to go into the commentRoutes.js if /comments is in the file path
router.use('/comments', commentRoutes);

module.exports = router;