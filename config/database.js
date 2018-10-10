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
