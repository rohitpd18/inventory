import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyEmailToken: String,
    verifyEmailTokenExpire: Date,

});

const User = mongoose.models.User || mongoose.model('User', UserSchema); 

export default User;