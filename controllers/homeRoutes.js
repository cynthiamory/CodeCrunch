// IMPORTS & DEPENDENCIES
const router = require("express").Router();
const { BlogPost, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

// GET ALL BLOG POSTS: Renders 'homepage.handlebars'; redirects to /login if not logged in
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comments,
          attributes: ["comments_body"],
        },
      ],
    });

    // SERIALIZE DATA SO TEMPLATE CAN READ IT 
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    // PASS SERIALIZED DATA AND SESSION FLAG INTO TEMPLATE
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET SINGLE BLOG POST: Renders 'blogPost.handlebars'; redirects to /login if not logged in
router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      // JOIN USER DATA AND COMMENT DATA WITH BLOG POST DATA
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comments,
          include: [User],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);

    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    res.redirect("/login");
  }
});

// USE WITHAUTH MIDDLEWARE TO PREVENT ACCESS TO ROUTE
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // FIND THE LOGGED IN USER BASED ON THE SESSION ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: BlogPost,
          include: [User],
        },
        {
          model: Comments,
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE NEW POST AND REDIRECT TO DASHBOARD
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ROUTE TO EDIT POST
router.get("/create/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      // JOIN USER DATA AND COMMENT DATA WITH BLOG POST DATA
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comments,
          include: [User],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);

    if (req.session.logged_in) {
      res.render("edit", {
        ...blogPost,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.all("/login", (req, res) => {
  // IF USER IS LOGGED IN, REDIRECT TO DASHBOARD
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

// EXPORT 
module.exports = router;
