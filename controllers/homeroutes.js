const router = require('express').Router();
const { Posts, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {
    try{
        const postData = await Posts.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_name'],
                }
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

//post page
router.get('/post/:id', async (req, res) => {
    try{
        const specPost = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_name'],
                },
                {
                    model: Comments,
                    as: 'comment',
                    attributes: ['comment', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['user_name']
                    }
                },
            ],
        });

        if(!specPost){
            res.status(404).json({message: 'No Post found.'});
        };

        const post = specPost.map((post), post.get({ plain: true }));
        res.render('aPost', {
            post,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//login page
router.get('/login', (req, res) => {
    res.render('login', { logged_in: req.session.logged_in})
});

//user dashboard; all posts a user has
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPostsData = await Posts.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'post_title', 'date_created', 'user_id'],
        });

        if(!userPostsData){res.status(404).json({ message: 'Cannot find Posts!'})};

        const userPosts = userPostsData.map((posts), post.get({ plain: true }));
        res.render('dashboard', {
            userPosts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;