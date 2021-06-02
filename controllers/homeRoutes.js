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
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  //If the user is already logged in, redirect them to the homepage (homepage.handlebars)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    console.table(user);
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  //If the user is already logged in, redirect them to the homepage (homepage.handlebars)
//   if (!req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }
//   res.render('dashboard');
// });

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created', 'user_id'],
          include: [
            {
            model: User,
            attributes: ['username'],
            }
          ]
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!'});
      return;
    }
    const posts = postData.get({ plain: true });
    console.log(posts);
    res.render(`post`, { posts, logged_in: req.session.logged_in});
  } catch (err) {
  }
})

module.exports = router;
  