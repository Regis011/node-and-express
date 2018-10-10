import express from "express";
import _ from "lodash";
import mongoose from 'mongoose';
import config from '../config/config.js';
import ConsultModel from '../models/consultModel';

const router = express.Router();

router.get(`/`, (req, res) => {
  ConsultModel.find((err, consults) => {
    if(err) res.status(500).send(err);
    res.json(consults);
  });
});

router.get(`/:id`, (req, res) => {

  ConsultModel.findById(req.params.id, (err, consult) => {
    if(err) res.status(500).send(err);
    if(consult){
      res.json(consult);
    }else{
      res.status(404).send(`User with id ${req.params.id} not found.`);
    }
  });

});

router.post(`/`, (req,res) => {
  console.log("This is POST request");
  const id = new mongoose.Types.ObjectId();
  const consultToPersist = Object.assign({
    _id: id
  }, req.body);

  const consult = new ConsultModel(consultToPersist);

  consult.save().then((err, consult) => {
    if(err) res.status(500).send(err);
    res.json(consult);
  })

});

router.put(`/:id`, (req,res) => {
  ConsultModel.findById(req.params.id, (err, consult) => {
    if(err) res.status(500).send(err);
    if(consult){
      consult.name = req.body.name;
      consult.course = req.body.course;
      consult.save().then((err, consult) => {
        if(err) res.status(500).send(err);
        res.json(consult);
      });
    } else {
      res.status(404).send(`User with id ${req.params.id} not found.`);
    }
  });
});

router.delete(`/:id`, (req,res) => {

  ConsultModel.findByIdAndRemove(req.params.id, (err, consult) => {
    if(err) res.status(500).send(err);
    res.status(200).send(`Consult with id ${req.params.id} was deleted`);
  });
});

module.exports = router;
