import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String, //Course Professor
    creator: String, //Course Overview
    message: String, //Course Name
    tags: String, //Course Video Link
    selectedFile: String, // Course Image
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;