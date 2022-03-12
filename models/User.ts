import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    githubProfile: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);