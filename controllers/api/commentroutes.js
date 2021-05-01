const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//to post a comment
router.post('/', withAuth, async (req, res) => {
    try {
      console.log('\n begin comment posting: ', req.body);
      const commentData = await Comments.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log('\n after save: ', commentData);
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
});

//to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comments.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    };
});

//need to make a put function
router.put('/:id', withAuth, async (req, res) => {
    try{
        const updatedComment = await Comments.update(
            {
                comment: req.body.comment,
            },
            {
                where: {
                    id: req.params.id
                },  
            },
        );

        if(!updatedComment){res.status(404).json({ message: 'Couldnt find that comment!'})};

        res.json(updatedComment);

    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;