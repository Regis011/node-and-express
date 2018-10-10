import express from "express";
import _ from "lodash";
import mongoose from 'mongoose';
import database from '../config/database';

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: String,
  name: String,
  age: Number,
  email: String,
  image: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
