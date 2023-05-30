var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import _ from "underscore";
import jwt from 'jsonwebtoken';
import { User } from "../db/models/user.js";
import { validateSignUp } from "../middleware/verifySignupBody.js";
import { alreadyExists } from "../middleware/alreadyExists.js";
import authConfig from '../db/config/auth.config.js';
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySignInBody.js";
import { Role } from "../db/models/role.js";
const router = Router();
//api/auth/signup
router.post("/signup", validateSignUp, alreadyExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "username", "email", "password");
    //12 rounds takes more
    body.password = yield bcrypt.hash(body.password, 12);
    const user = new User(body);
    //save the password hash to db:
    try {
        user.roles = [yield (yield Role.findOne({ name: 'user' }))._id];
        yield user.save();
        return res.json({ message: "user saved", id: user._id });
    }
    catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
}));
router.post("/signin", validateSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //email and password:
    try {
        //SELECT * FROM user JOIN Roles ON ...
        const user = yield User.findOne({ email: req.body.email }).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "No Such User" });
        }
        //123*12
        //verify body.password matches user.password
        const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ email: user.email }, authConfig.secret, {
            expiresIn: "30d",
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
        }
        return res
            .status(200)
            .json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    }
    catch (e) {
        return res.status(500).json({ message: "Server Error", error: e });
    }
}));
export { router as authRouter };
