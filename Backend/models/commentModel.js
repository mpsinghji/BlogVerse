import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;