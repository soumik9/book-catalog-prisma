"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetProfile_1 = __importDefault(require("../controllers/auth/GetProfile"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
const router = express_1.default.Router();
//routes
router.get('/', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN, constatnts_1.ENUM_USER_ROLE.CUSTOMER), GetProfile_1.default);
exports.default = router;
