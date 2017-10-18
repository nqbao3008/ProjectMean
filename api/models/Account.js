var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
    userName: {
        type: String,
        minlength: 10,
        maxlengh: 20
    },
    password: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Saves the user's password hashed (plain text password storage is not good)
AccountSchema.pre('save', function(next) {
    var account = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(account.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                account.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
AccountSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Account', AccountSchema);