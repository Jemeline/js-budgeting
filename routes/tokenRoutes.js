const express = require('express');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const userModel = require('../models/user');
const tokenModel = require('../models/token');
const app = express();

app.get('/confirmation/:id/:token', async (req, res) => {
    try {
        await tokenModel.findOne({token:req.params.token}, function (err, token) {
            if (!token) {
              const token = new tokenModel({ _userId: req.params.id, token: crypto.randomBytes(16).toString('hex') });
              token.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message }); 
                }
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_ACC,
                        pass: process.env.GMAIL_PASS
                    }
                });
                var mailOptions = { from: process.env.GMAIL_ACC, to: newuser.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newuser._id + '/'+ token.token +'\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { 
                        return res.status(500).send({ msg: err.message }); 
                    }
                    res.status(200).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired. A verification email has been resent with a new token.' });
                });
            });
            }
            userModel.findOne({ _id: token._userId}, function (err, user) {
              if (!user) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a user for this token.' });
              if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
              user.isVerified = true;
              user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send({type:'verified', msg:"The account has been verified. Please log in."});
              });
            });
        });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
      
    }
});

app.get('/confirmation/:token', async (req, res) => {
  try {
      await tokenModel.findOne({token:req.params.token}, function (err, token) {
          if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
          userModel.findOne({ _id: token._userId}, function (err, user) {
            if (!user) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
            user.isVerified = true;
            user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send({type:'verified', msg:"The account has been verified. Please log in."});
            });
          });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    
  }
});

module.exports = app;