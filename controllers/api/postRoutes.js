const router = require('express').Router();
const { Post } = require('../../models');
// const withAuth = require('../../utils/auth');

//get route to find all issues
router.get('/', async (req, res) => {
  const issuesData = await Issue.findAll().catch((err) => { 
      res.json(err);
    });
      res.json(issuesData);
});

//get route to search for issues, based on ID
router.get('/:id', async (req, res) => {
  const issueData = await Issue.findByPk(req.params.id, {
  });
  if (!issueData) {
    res.status(404).json({ message: 'No issue found with this id!' });
    return;
  }
      res.json(issueData);
});


//post route to create new issues, this is for logged in users only
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    const post = newPost.get({ plain: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});


//delete route, to destroy issues, requires authentication
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
});
    if (!deletedPost) {
      res.status(404).json({ message: 'No issue found with this id!' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;