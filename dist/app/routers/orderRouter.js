"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const constatnts_1 = require("../../utils/constatnts");
const CreateOrder_1 = __importDefault(require("../controllers/order/CreateOrder"));
const GetOrders_1 = __importDefault(require("../controllers/order/GetOrders"));
const GetOrder_1 = __importDefault(require("../controllers/order/GetOrder"));
const router = express_1.default.Router();
//routes
router.get('/:orderId', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN, constatnts_1.ENUM_USER_ROLE.CUSTOMER), GetOrder_1.default);
router.get('/', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.ADMIN, constatnts_1.ENUM_USER_ROLE.CUSTOMER), GetOrders_1.default);
router.post('/create-order', (0, auth_1.default)(constatnts_1.ENUM_USER_ROLE.CUSTOMER), CreateOrder_1.default);
exports.default = router;
