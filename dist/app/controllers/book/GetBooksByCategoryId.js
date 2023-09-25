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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../../utils/helpers/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../utils/helpers/SendResponse"));
const prisma_1 = __importDefault(require("../../../utils/helpers/prisma"));
const pick_1 = __importDefault(require("../../../utils/helpers/pick"));
const constatnts_1 = require("../../../utils/constatnts");
const calculatePagination_1 = __importDefault(require("../../../utils/helpers/calculatePagination"));
const GetBooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, constatnts_1.bookFilterableFields);
    const options = (0, pick_1.default)(req.query, constatnts_1.paginationProps);
    const { size, page, skip } = (0, calculatePagination_1.default)(options);
    const { searchTerm, minPrice, maxPrice } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    // Extract minPrice and maxPrice from query parameters
    const minPriceConverted = parseFloat(req.query.minPrice) || undefined;
    const maxPriceConverted = parseFloat(req.query.maxPrice) || undefined;
    const andConditions = [];
    // Ensure categoryId matches req.params.categoryId
    andConditions.push({
        categoryId: req.params.categoryId,
    });
    // search terms
    if (searchTerm) {
        andConditions.push({
            OR: constatnts_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    // filtering with fields
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (constatnts_1.bookRelationalFields.includes(key)) {
                    return {
                        [constatnts_1.bookRelationalFieldsMapper[key]]: {
                            id: filterData[key]
                        }
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key]
                        }
                    };
                }
            })
        });
    }
    // Filter books based on minPrice and maxPrice
    if (minPrice !== undefined) {
        andConditions.push({
            price: {
                gte: minPriceConverted,
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                lte: maxPriceConverted,
            },
        });
    }
    // where condition
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // get all books with filter
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                publicationDate: 'desc'
            }
    });
    // get total amount of books
    const total = yield prisma_1.default.book.count({ where: whereConditions });
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books with associated category data fetched successfully!',
        data: result,
        meta: {
            totalPage: Math.ceil(total / size),
            total,
            page,
            size
        },
    });
}));
exports.default = GetBooksByCategoryId;
