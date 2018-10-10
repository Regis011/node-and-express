import express from "express";
import _ from "lodash";
import mongoose from 'mongoose';
import database from '../config/database';

const ConsultSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  course: String
});

const ConsultModel = mongoose.model('Consult', ConsultSchema);

module.exports = ConsultModel;
