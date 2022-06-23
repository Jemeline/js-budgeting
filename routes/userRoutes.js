const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const userModel = require('../models/user');
const tokenModel = require('../models/token');

const app = express();

app.post(
  '/user/login',
  [
    check('email', 'Email is not valid').not().isEmpty().isEmail()
      .normalizeEmail({ remove_dots: false }),
    check('password', 'Password required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

    const user = await userModel.findOne({ email: req.body.email });
    try {
      if (!user) return res.status(401).send({ msg: 'This email address is not associated with any account.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.status(401).send({ msg: 'Invalid password' });
        res.send({ user: user.toJSON() });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

app.post(
  '/user/register',
  [
    check('email', 'Email is not valid').not().isEmpty().isEmail()
      .normalizeEmail({ remove_dots: false }),
    check('password', 'Password required').isLength({ min: 8 }),
    check('first', 'Firstname required').notEmpty(),
    check('last', 'Lastname required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());
    try {
      const newuser = new userModel(req.body);
      newuser.dateMember = new Date();
      newuser.isVerified = false;
      newuser.save((err) => {
        if (err) {
          if (err.code === 11000) {
            return res.status(401).send({ msg: 'The email address you entered is already associated with another account.' });
          }
          return res.status(500).send({ msg: err.message });
        }
      });
      const token = new tokenModel({ _userId: newuser._id, token: crypto.randomBytes(4).toString('hex') });
      token.save((err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_ACC,
            pass: process.env.GMAIL_PASS,
          },
        });
        const mailOptions = {
          from: process.env.GMAIL_ACC,
          to: newuser.email,
          subject: 'JS Budgeting Email Verification',
          text: `Hello ${newuser.first.charAt(0).toUpperCase()}${newuser.first.slice(1).toLowerCase()},\n\n` + `Please verify your account by entering the following token: ${token.token}`,
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send({ user: newuser.toJSON(), msg: `A verification email has been sent to ${newuser.email}.` });
        });
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
);

app.post(
  '/user/forgot-password/:email',
  [
    check('email', 'Email is not valid').not().isEmpty().isEmail()
      .normalizeEmail({ remove_dots: false }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

    try {
      const user = await userModel.findOne({ email: req.params.email });
      if (!user) return res.status(401).send({ msg: 'The user id is not associated with any account.' });
      user.passwordResetToken = crypto.randomBytes(8).toString('hex');
      const now = new Date().getTime();
      user.passwordResetExpires = now / 1000 + 3600;
      user.save((err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_ACC,
            pass: process.env.GMAIL_PASS,
          },
        });
        const mailOptions = {
          from: process.env.GMAIL_ACC,
          to: user.email,
          subject: 'JS Budgeting Password Reset',
          text: `Hello ${user.first.charAt(0).toUpperCase()}${user.first.slice(1).toLowerCase()},\n\n` + `Please reset your password using the following token: ${user.passwordResetToken}`,
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send({ msg: `A password reset token has been sent to ${user.email}.` });
        });
      });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  },
);

app.post(
  '/user/forgot-password-verify/:token',
  [
    check('newPassword', 'New Password required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());

    try {
      const user = await userModel.findOne({ passwordResetToken: req.params.token });
      if (!user) return res.status(401).send({ msg: 'The reset token is not associated with any account.' });
      const now = new Date().getTime();
      if (user.passwordResetExpires <= now / 1000) {
        return res.status(401).send({ msg: 'Your token has expired. Please request a new one.' });
      }
      user.password = req.body.newPassword;
      user.save((err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.send({ user: user.toJSON() });
      });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  },
);

app.get('/user/find-by-id/:id', async (req, res) => {
  const user = await userModel.findById(req.params.id);
  try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
