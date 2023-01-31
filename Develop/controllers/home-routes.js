const router = require('express').Router();
const { techBlog, Users } = require('../models/');
const withAuth = require('../utils/auth');

// GET Route for Homepage
router.get('/', withAuth, (req, res) => {
  try {
    const techBlogData = await techBlog.findAll({
      limit: 10,
      order: [['id', 'DSC']]
    });

    const blog = techBlogData.map((project) => project.get({ plain: true }));

    res.render('homepage', { blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Route for showing all blogs created
router.get('/blogs', withAuth, async (req, res) => {
  try {
    // variable for getting all albums reviewed from Model
    const blogsCreated = await techBlog.findAll({
      order: [['title', 'ASC']],
    });

    // serialize data so templates can read
    const blogs = blogsCreated.map((project) => project.get({ plain: true }));

    // pass serialized data into handlebars
    res.render('blogs', { blogs })
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for a specific blog
router.get('/blogs/:id', withAuth, async (req, res) => {
  try {
    const blogs = await techBlog.findByPk(req.params.id, {
    });

    // serialize data so templates can read
    const blogData = blogs.map((project) => project.get({ plain: true }));

    // pass serialized data into handlebars
    res.render('blogs', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
})

// POST route for creating a new blog
router.post('/newblog', withAuth, async (req, res) => {
  try {
    // variable for album review data - gets data for album, then data for review
    const blogData = await techBlog.create({
      title: req.body.title,
      comment: req.body.comment,
      blog_id: req.body.blog_id,
      user_id: req.body.user_id,
    });

    // show 200 status if successful
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route for deleting a blog
router.delete('/blogs/:id', withAuth, async (req, res) => {
  try {
    // use .destroy
    const blogData = await techBlog.destroy({
      where: {
        id: req.params.id,
      },
    });

    //if no id found gives 404
    if (!blogData) {
      res.status(404).json({'No review found with that id!'});
      return;
    }

    // status 200 if successful
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Redirects users if already logged in
router.get('/login', withAuth, (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;