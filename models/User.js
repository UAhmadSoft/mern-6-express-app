const mongoose = require('mongoose');

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

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
