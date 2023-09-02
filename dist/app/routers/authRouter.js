"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Signup_1 = __importDefault(require("../controllers/auth/Signup"));
const Signin_1 = __importDefault(require("../controllers/auth/Signin"));
const router = express_1.default.Router();
//routes
router.post('/signin', Signin_1.default);
router.post('/signup', Signup_1.default);
exports.default = router;
