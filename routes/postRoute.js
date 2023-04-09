import express from 'express';
import { createPost, deletePost, getPost, getPostById, updatePost, likePost } from '../controller/postController.js';


const router = express.Router();
router.route("/").post(createPost);
router.route("/").get(getPost);
router.route("/:id").get(getPostById);
router.route("/:id").patch(updatePost);
router.route("/:id").delete(deletePost)
router.route("/:id/like").patch(likePost)

export default router;
