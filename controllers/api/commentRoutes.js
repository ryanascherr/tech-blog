const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
// const withAuth = require('../../utils/auth');

// get route to find all comments
router.get('/', async (req, res) => {
    const commentsData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],

    }).catch((err) => { 
        res.json(err);
      });
        res.json(commentsData);
});

//post route to create comments, requires authentication
router.post('/', (req, res) => {
    try {
      const newComment = Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        user_username: req.session.user_username,
        issue_id: req.body.btnID,
      });
      console.table(newComment);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

//delete route to remove comments, requires authentication
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;