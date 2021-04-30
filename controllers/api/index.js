const router = require('express').Router();
const userRoutes = require('./userroutes');
const projectRoutes = require('./postroutes');
const commentRoutes = require('./commentroutes');

router.use('/users', userRoutes);
router.use('/posts', projectRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
