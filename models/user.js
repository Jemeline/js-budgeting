const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Email required"],
      trim: true,
      lowercase: true,
      createIndexes: { unique: true },
    },
    password: {
      type: String,
      required: [true, 'Password required']
    },
    first:{
        type: String,
        required: [true, 'Firstname required'],
        lowercase: true
    },
    last:{
        type: String,
        required: [true, 'Lastname required'],
        lowercase: true
    },
    dateMember:{
        type:Date,
        required: [true, 'DateMember required'],
    },
    role:{
        type: Boolean,
        required: [true, 'Type required'],
        default:false,
    },
    isVerified: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date
  });
  
UserSchema.pre("save", function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
