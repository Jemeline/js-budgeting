const express = require('express');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const userModel = require('../models/user');
const tokenModel = require('../models/token');
const app = express();
const { check, validationResult} = require('express-validator');

app.get('/user/:email', async (req, res) => {
    const user = await userModel.find({email:req.params.email}).select("-password");
    try {
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.post('/user', async (req, res) => {
    const user = new userModel(req.body);
    user.dateMember = new Date();
    
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.post('/user/login', [
    check('email','Email is not valid').not().isEmpty().isEmail().normalizeEmail({ remove_dots: false }),
    check('password', 'Password required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());
        
        const user = await userModel.findOne({ email: req.body.email});
        try {
            if (!user) return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) return res.status(401).send({ msg: 'Invalid email or password' });
                if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
                res.send({ token: "insert token here", user: user.toJSON() });
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

app.post('/user/register', [
    check('email','Email is not valid').not().isEmpty().isEmail().normalizeEmail({ remove_dots: false }),
    check('password', 'Password required').isLength({min: 8}),
    check('first','Firstname required').notEmpty(),
    check('last', 'Lastname required').notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).jsonp(errors.array());
        
        try {
            const newuser = new userModel(req.body);
            newuser.dateMember = new Date();
            newuser.role = false;
            newuser.isVerified = false;
            newuser.save(function (err) {
                if (err) {
                    if (err.code === 11000){
                        return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' })
                    }
                    return res.status(500).send({ msg: err.message }); 
                }
                const token = new tokenModel({ _userId: newuser._id, token: crypto.randomBytes(16).toString('hex') });

                token.save(function (err) {
                    if (err) {
                        if (err.code === 11000){
                            return res.status(400).send({ msg: 'The email address you have entered is already associated with another token.' })
                        }
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
                        res.status(200).send('A verification email has been sent to ' + newuser.email + '.');
                    });
                });
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

app.delete('/user/:id', async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id)
  
      if (!user) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
});

app.patch('/user/:id', async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.id, req.body)
      await userModel.save()
      res.send(user)
    } catch (err) {
      res.status(500).send(err)
    }
});
  
module.exports = app