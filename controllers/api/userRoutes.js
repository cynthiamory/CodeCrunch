// IMPORTS & DEPENDENCIES
const router = require("express").Router();
const { User } = require("../../models");

// WHEN USER CREATES A NEW ACCOUNT, THIS ROUTE CREATES A NEW USER IN THE DATABASE
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// USER LOGIN AND VALIDATION  
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log("no user is found");
      res
        .status(400)
        .json({ message: "Invalid email and/or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("the password does not match");
      res
        .status(400)
        .json({ message: "Invalid email and/or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Login Successful!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//LOUGOUT ROUTE
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// EXPORTS 
module.exports = router;
