import express from "express";

const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
      res.redirect('/auth/login');
    } else {
      next();
    }
};

router.get('/', authCheck, (req, res) => {
  res.send('Logged in some ' + req.user.name)
})

module.exports = router;
