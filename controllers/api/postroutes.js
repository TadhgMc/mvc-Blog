const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// post route
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Posts.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

// delete route
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const postData = await Posts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/:id', withAuth, async (req, res) => {
    try{
        const updatedPost = await Posts.update(
            {
                post_title: req.body.post_title,
                post_body: req.body.post_body,
            },
            {
                where: {
                    id: req.params.id
                }    
            },
        );

        if(!updatedPost){res.status(404).json({ message: 'Couldnt find that post!'})};

        res.json(updatedPost);

    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;