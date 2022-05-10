import express from 'express';
import userController from "../controllers/user-controller.js";
import DialogController from '../controllers/dialog-controller.js';
const router = express.Router();

router.post("/registration",userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.post("/users", userController.getUsers)
router.post("/createdialog",DialogController.createDialog)
router.post("/dialogs",DialogController.getDialogs)
router.post("/messages",DialogController.getMessages)

export default router;