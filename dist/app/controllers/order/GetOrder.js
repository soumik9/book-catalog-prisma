"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const prisma_1 = __importDefault(require("../../../utils/helpers/prisma"));
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../utils/errors/ApiError"));
const GetOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let result;
    if (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) === client_1.UserRoles.admin) {
        // get all orders
        result = yield prisma_1.default.order.findUnique({
            where: {
                id: req.params.orderId
            },
            include: {
                orderedBooks: true,
                user: true
            }
        });
    }
    else {
        // get all orders by specific customer
        result = yield prisma_1.default.order.findUnique({
            where: {
                userId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId,
                id: req.params.orderId
            },
            include: {
                orderedBooks: true,
                user: true
            }
        });
        if (!result) {
            // Throw an error indicating that no order was found
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not authorized to this order!');
        }
    }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrived successfully!',
        data: result,
    });
}));
exports.default = GetOrder;
