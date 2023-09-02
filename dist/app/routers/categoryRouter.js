"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
const GetCategory_1 = __importDefault(require("../controllers/category/GetCategory"));
const GetCategories_1 = __importDefault(require("../controllers/category/GetCategories"));
const UpdateCategory_1 = __importDefault(require("../controllers/category/UpdateCategory"));
const DeleteCategory_1 = __importDefault(require("../controllers/category/DeleteCategory"));
const CreateCategory_1 = __importDefault(require("../controllers/category/CreateCategory"));
const router = express_1.default.Router();
//routes
router.get('/:id', GetCategory_1.default);
router.get('/', GetCategories_1.default);
router.post('/create-category', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN), CreateCategory_1.default);
router.patch('/:id', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN), UpdateCategory_1.default);
router.delete('/:id', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN), DeleteCategory_1.default);
exports.default = router;
