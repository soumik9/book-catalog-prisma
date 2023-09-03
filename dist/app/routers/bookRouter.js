"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
const GetBook_1 = __importDefault(require("../controllers/book/GetBook"));
const GetBooks_1 = __importDefault(require("../controllers/book/GetBooks"));
const CreateBook_1 = __importDefault(require("../controllers/book/CreateBook"));
const UpdateBook_1 = __importDefault(require("../controllers/book/UpdateBook"));
const DeleteBook_1 = __importDefault(require("../controllers/book/DeleteBook"));
const GetBooksByCategoryId_1 = __importDefault(require("../controllers/book/GetBooksByCategoryId"));
const router = express_1.default.Router();
//routes
router.get('/:categoryId/category', GetBooksByCategoryId_1.default);
router.get('/:id', GetBook_1.default);
router.get('/', GetBooks_1.default);
router.post('/create-book', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN), CreateBook_1.default);
router.patch('/:id', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN), UpdateBook_1.default);
router.delete('/:id', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN), DeleteBook_1.default);
exports.default = router;
