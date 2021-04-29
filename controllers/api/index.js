const router = require('express').Router();
const userRoutes = require('./userroutes');//needs updated
const projectRoutes = require('./postroutes');//needs updated

router.use('/users', userRoutes);//needs updated
router.use('/posts', projectRoutes);//needs updated

module.exports = router;
