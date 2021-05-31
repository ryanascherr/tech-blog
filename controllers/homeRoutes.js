const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        // logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
    res.render('homepage');
});

module.exports = router;
  