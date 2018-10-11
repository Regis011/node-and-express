import express from "express";
import ConsultModel from '../models/consultModel';

const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
      res.redirect('/auth/login');
    } else {
      next();
    }
};

router.get('/', authCheck, (req, res) => {
  ConsultModel.find((err, consults) => {
    if(err) res.status(500).send(err);
    res.render('profile', {
      consults: consults,
      user: req.user
    })
  });
})

module.exports = router;
