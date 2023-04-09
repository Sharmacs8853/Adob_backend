import express from 'express';
import { createUser, getUser, getUserbyId, updateUser, deleteUser, userLogin } from '../controller/userController.js';

const router = express.Router();
router.route("/").post(createUser);
router.route("/").get(getUser);
router.route("/:id").get(getUserbyId);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/login").post(userLogin)

export default router;
