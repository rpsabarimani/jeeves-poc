import express from 'express';
import multer from 'multer'
import { login, register } from '../controller/users';
import { add as addTopic, getAll as getTopics } from '../controller/posts/topics';
import { add as addPost, getAll as getPosts } from '../controller/posts';
import { authMiddleware } from '../utils/authMiddleware';
const Router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const { topicId } = req.params
        const { originalname, fieldname } = file;
        const originalnameArr = originalname.split('.')
        const ext = originalnameArr[originalnameArr.length - 1]
        cb(null, `${fieldname}-${topicId}-${Date.now()}.${ext}`)
    }
})
const upload = multer({ storage })

Router.post("/register", register);
Router.post("/login", login);
Router.post("/topics", authMiddleware, addTopic);
Router.get("/topics", authMiddleware, getTopics);
Router.post("/topics/:topicId/posts", authMiddleware, upload.array('files'), addPost);
Router.get("/topics/:topicId/posts", authMiddleware, getPosts);

module.exports = Router