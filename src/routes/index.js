import express from 'express';
import { login, register } from '../controller/users';
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router