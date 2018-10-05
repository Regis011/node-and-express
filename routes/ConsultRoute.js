import express from "express";
import _ from "lodash";
import consults from '../data/consults.json';
import mongoose from 'mongoose';

const router = express.Router();

const DB_USER = '<user>';
const DB_USER_PASSWORD = '<password>';
const DB_URL =`mongodb://${DB_USER}:${DB_USER_PASSWORD}@ds123933.mlab.com:23933/sandbox_chas`;

let consultsArray = consults;

// Connect to mongoDB
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Hello mLab!');
});

const ConsultSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  course: String
});
const ConsultModal = mongoose.model('Consult', ConsultSchema);

router.get(`/`, (req, res) => {
  ConsultModal.find((err, consults) => {
    if(err) res.status(500).send(err);
    res.json(consults);
  });
});

router.get(`/:id`, (req, res) => {

  ConsultModal.findById(req.params.id, (err, consult) => {
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

  const consult = new ConsultModal(consultToPersist);

  consult.save().then((err, consult) => {
    if(err) res.status(500).send(err);
    res.json(consult);
  })

});

router.put(`/:id`, (req,res) => {
  ConsultModal.findById(req.params.id, (err, consult) => {
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

  ConsultModal.findByIdAndRemove(req.params.id, (err, consult) => {
    if(err) res.status(500).send(err);
    res.status(200).send(`Consult with id ${req.params.id} was deleted`);
  });
});

module.exports = router;
