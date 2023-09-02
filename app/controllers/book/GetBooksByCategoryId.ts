import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Book, Prisma } from '@prisma/client';
import pick from '../../../utils/helpers/pick';
import { bookFilterableFields, bookRelationalFields, bookRelationalFieldsMapper, bookSearchableFields, paginationProps } from '../../../utils/constatnts';
import calculatePagination from '../../../utils/helpers/calculatePagination';

const GetBooksByCategoryId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, bookFilterableFields);
        const options = pick(req.query, paginationProps);

        const { size, page, skip } = calculatePagination(options);
        const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

        // Extract minPrice and maxPrice from query parameters
        const minPriceConverted = parseFloat(req.query.minPrice as string) || undefined;
        const maxPriceConverted = parseFloat(req.query.maxPrice as string) || undefined;

        const andConditions: any = [];

        // Ensure categoryId matches req.params.categoryId
        andConditions.push({
            categoryId: req.params.categoryId,
        });

        // search terms
        if (searchTerm) {
            andConditions.push({
                OR: bookSearchableFields.map((field) => ({
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
                    if (bookRelationalFields.includes(key)) {
                        return {
                            [bookRelationalFieldsMapper[key]]: {
                                id: (filterData as any)[key]
                            }
                        };
                    } else {
                        return {
                            [key]: {
                                equals: (filterData as any)[key]
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
        const whereConditions: Prisma.BookWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

        // get all books with filter
        const result = await prisma.book.findMany({
            include: {
                category: true,
            },
            where: whereConditions,
            skip,
            take: size,
            orderBy:
                options.sortBy && options.sortOrder
                    ? { [options.sortBy as string]: options.sortOrder }
                    : {
                        createdAt: 'desc'
                    }
        });

        // get total amount of books
        const total = await prisma.book.count({ where: whereConditions });

        sendResponse<Book[]>(res, {
            statusCode: httpStatus.OK,
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
    }
)

export default GetBooksByCategoryId;