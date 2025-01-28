import express from "express";
import Comment from "../models/commentModel.js";

const router = express.Router();

// create a comment
router.post("/post-comment", async (req, res) => {
    try {
        // console.log(req.body);

        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).send({
            message: "Comment created successfully",
            comment: newComment,
        });
    } catch (error) {
        console.error("error creating comment", error);
        res.status(500).json({ message: "Error creating comment" });       
    }
});

// get all comments count
router.get("/total-comments", async (req,res) =>{
    try {
        const totalComments = await Comment.countDocuments();
        res.status(200).send({
            message: "Total comments fetched successfully",
            totalComments,
        });
    } catch (error) {
        console.error("Error fetching comments", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
})

export default router;
