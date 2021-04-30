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
                },
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

// specific post page
router.get('/post/:id', async (req, res) => {
    try{
        console.log('\n /post/:id start', req.params.id)
        const specPost = await Posts.findByPk(req.params.id, {
            attributes: ['id', 'post_title', 'post_body', 'date_created', 'user_id'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_name'],
                },
                {
                    model: Comments,
                    as: 'comments',
                    attributes: ['id', 'comment', 'user_id', 'post_id'],
                    include: [
                        {
                        model: User,
                        as: 'user',
                        attributes: ['user_name'],
                        }
                    ],
                },
            ],
        });

        if(!specPost){
            res.status(404).json({message: 'No Post found.'});
        };

        const post = specPost.get({ plain: true });
        console.log('\n post: ', post);
        res.render('post', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

//login page
router.get('/login', (req, res) => {
    res.render('login', { logged_in: req.session.logged_in})
});

//user dashboard; all posts a user has
router.get('/profile', withAuth, async (req, res) => {
    try {
        console.log('\n /profile begin');
        const userPostsData = await Posts.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        console.log('\n /profile before if');
        if(!userPostsData){res.status(404).json({ message: 'Cannot find User!'})};
        console.log('\n /profile before .map');
        const userPosts = userPostsData.map((post) => post.get({ plain: true }));
        console.log('\n userpost: ',userPosts);
        res.render('profile', {
            userPosts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;