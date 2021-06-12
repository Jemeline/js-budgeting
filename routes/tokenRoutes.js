const express = require('express');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const userModel = require('../models/user');
const tokenModel = require('../models/token');
const { check, validationResult} = require('express-validator');
const app = express();

app.get("/verify/:_id", [
  check("_id", "_id is not valid").not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());
  try {
    const user = await userModel.findOne({_id: req.params._id});
    if (!user) return res.status(401).send({msg: "We were unable to find a user asociated with this id."});
    await tokenModel.deleteMany({_userId: user._id});
    const token = new tokenModel({_userId: user._id, token: crypto.randomBytes(4).toString("hex")});
    token.save(function(err) {
      if (err) {
        return res.status(500).send({msg: err.message});
      }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_ACC,
          pass: process.env.GMAIL_PASS
        },
      });
      const mailOptions = {
        from: process.env.GMAIL_ACC,
        to: user.email, subject: "JS Budgeting Email Verification",
        text: "Hello "+user.first.charAt(0).toUpperCase()+user.first.slice(1).toLowerCase()+",\n\n" + "Please verify your account by entering the following token: "+ token.token};
      transporter.sendMail(mailOptions, function(err) {
        if (err) {
          return res.status(500).send({msg: err.message});
        }
        res.status(200).send({msg: "A verification email has been sent to " + user.email + "."});
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
);

app.post("/verify", [
  check("_userId", "_userId is not valid").not().isEmpty(),
  check("token", "Token is not valid").not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());
  try {
    await tokenModel.findOne({token: req.body.token, _userId: req.body._userId}, function(err, token) {
      if (!token) return res.status(401).send({type: "not-verified", msg: "We were unable to find a valid token. Your token may have expired."});
      userModel.findOne({_id: req.body._userId}, function(err, user) {
        if (!user) return res.status(402).send({type: "not-verified", msg: "We were unable to find a user for this token."});
        if (user.isVerified) return res.status(403).send({type: "already-verified", msg: "This user has already been verified."});
        user.isVerified = true;
        user.save(function(err) {
          if (err) {
            return res.status(500).send({msg: err.message});
          }
          res.send({user: user.toJSON()});
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = app;

