const router = require('express').Router();
const Blog = require('../../models/');
const withAuth = require('../../utils/auth');

// GET route for showing all blogs
router.get('/', withAuth, async (req, res) => {
    try {
      // variable for getting all reviews in general
      const allBlogs = await Blog.findAll();

      console.log(allBlogs);
  
      res.status(200).json(allBlogs);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET route for showing a specific blog
  router.get('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id);
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // POST route for creating a new blog
  router.post('/new-post', withAuth, async (req, res) => {
    try {
       // variable for album data
      const blogData = await Blog.create({
        title: req.body.title,
        comment: req.body.comment,
        id: req.session.userId
      })

      console.log(blogData);

      res.status(200).json(blogData);

    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE route for deleting a blog
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      // use .destroy
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      //if no id found gives 404
      if (!blogData) {
        res.status(404).json('No blog found with that id!');
        return;
      }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;