// PURPOSE: CRUD routes for Comment model
const router = require("express").Router();
const { BlogPost, Comments, User } = require("../../models");

// CREATE COMMENT: CREATES A NEW COMMENT
router.post("/", async (req, res) => {
  try {
    console.log("we made it");
    const comments = await Comments.create({
      comments_body: req.body.comments_body,
      blogPost_id: req.body.blogPost_id,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET ALL COMMENTS
router.get("/", async (req, res) => {
  try {
    const commentsData = await Comments.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: BlogPost,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE THE COMMENT
router.put("/:id", async (req, res) => {
  try {
    const updatedComments = await Comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedComments[0]) {
      res.status(400).json({ message: "There is not comment with that ID!" });
      return;
    }

    console.log("Your comment has been updated!");
    res.status(200).json(updatedComments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE THE COMMENT BY ID
router.delete("/:id", async (req, res) => {
  try {
    const comments = await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comments) {
      res.status(404).json({ message: "There is not comment with that ID!" });
      return;
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORTS
module.exports = router;
