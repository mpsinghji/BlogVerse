import express from "express";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

//create a blog
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
  try {
    // console.log(req.body);

    // to get all the data from the body
    const newPost = new Blog({ ...req.body, author: req.userId });
    await newPost.save();
    res.status(201).send({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("error creating post", error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// get all blogs
router.get("/", async (req, res) => {
  try {
    //to search for a blog
    const { search, category, location } = req.query;
    // console.log(search);

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          // { content: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }
        ],
      };
    }
    if (category) {
      query = {
        ...query,
        category,
      };
    }
    if (location) {
      query = {
        ...query,
        location,
      };
    }

    const posts = await Blog.find(query)
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.status(200).send( posts );
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get a single blog by id
router.get("/:id", async (req, res) => {
  try {
    // console.log(req.params.id);

    const postId = req.params.id;
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // TODO: will also fetch comment with the post
    const comments = await Comment.find({ postId: postId }).populate(
      "user",
      "username email"
    );

    res.status(200).send({
      post,comments
    });
  } catch (error) {
    console.error("Error fetching single post", error);
    res.status(500).json({ message: "Error fetching single post" });
  }
});

// update a blog post
router.patch("/update-post/:id", verifyToken,isAdmin, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedpost = await Blog.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (!updatedpost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedpost });
  } catch (error) {
    console.error("Error updating post", error);
    res.status(500).json({ message: "Error updating post" });
  }
});

// delete a blog post
router.delete("/:id", verifyToken,isAdmin, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Blog.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // delete related comments
    await Comment.deleteMany({ postId: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post", error);
    req.status(500).json({ message: "Error deleting post" });
  }
});

//related posts
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Post Id is required" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }
    const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i");

    const relatedQuery = {
      _id: { $ne: blog._id }, //exclude the current blog by id
      title: { $regex: titleRegex },
    };

    const relatedPost = await Blog.find(relatedQuery);
    res.status(200).json(relatedPost);
  } catch (error) {
    console.error("Error fetching related posts", error);
    res.status(500).json({ message: "Error fetching related posts" });
  }
});

export default router;
