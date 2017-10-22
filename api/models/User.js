var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var nameCheck = (name) => {
    return (name.length > 5 && name.length < 100 && name.match(/[a-z]/i) && name.match(/[0-9]/i))
}

var UserSchema = new Schema({
    name: {
        type: String,
        //validate: nameCheck 
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    phone: {
        type: Number
    },
    status: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    userName: {
        type: String,
        minlength: 10,
        maxlengh: 20
    },
    password: {
        type: String
    },
    OrderID: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

UserSchema.pre('save', function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(password, encrypted,  cb) {

    bcrypt.compare(password, encrypted, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);