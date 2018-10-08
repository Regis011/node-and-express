import express from "express";
import _ from "lodash";
import mongoose from 'mongoose';
import config from './config.js';

const options = {
  useNewUrlParser: true
};

// Connect to mongoDB
mongoose.connect(config.DB_URL, options);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Hello mLab!');
});

const ConsultSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  course: String
});

const ConsultModel = mongoose.model('Consult', ConsultSchema);

module.exports = ConsultModel;
