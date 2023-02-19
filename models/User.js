const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: {
      type: String,
      maxLength: 25,
      trim: true,
      // * lastName : "     Raze     " -> "Raze"
    },
    email: {
      type: String,
      unique: true,
      // required  : true
      required: [true, 'Email is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'PasswordConfirm is required'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    // createdAt : {
    //   type : Date,
    //   default  : Date.now()
    // }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.virtual('fullname').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 11);

  console.log('hashedPassword', hashedPassword);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.password) return next();

  const hashedPassword = await bcrypt.hash(this._update.password, 11);

  console.log('hashedPassword', hashedPassword);

  this._update.password = hashedPassword;
  this._update.passwordConfirm = undefined;

  next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
