import express from 'express';
import { login, register } from '../controller/users';
import { add as addTopic } from '../controller/posts/topics';
import { authMiddleware } from '../utils/authMiddleware';
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.post("/topic", authMiddleware, addTopic);

module.exports = Router