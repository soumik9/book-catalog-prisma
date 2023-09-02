"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = exports.paginationProps = exports.ENUM_USER_ROLE = void 0;
var ENUM_USER_ROLE;
(function (ENUM_USER_ROLE) {
    ENUM_USER_ROLE["ADMIN"] = "admin";
    ENUM_USER_ROLE["CUSTOMER"] = "customer";
})(ENUM_USER_ROLE = exports.ENUM_USER_ROLE || (exports.ENUM_USER_ROLE = {}));
// pagination props
exports.paginationProps = ['page', 'size', 'sortBy', 'sortOrder'];
// book search and filter
exports.bookFilterableFields = ['searchTerm', 'title', 'author'];
exports.bookSearchableFields = ['title', 'author', 'genre',];
exports.bookRelationalFields = ['categoryId'];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
};
