import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Book, Prisma } from '@prisma/client';
import { bookFilterableFields, bookRelationalFields, bookRelationalFieldsMapper, bookSearchableFields, paginationProps } from '../../../utils/constatnts';
import pick from '../../../utils/helpers/pick';
import calculatePagination from '../../../utils/helpers/calculatePagination';


const GetBooks: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, bookFilterableFields);
        const options = pick(req.query, paginationProps);

        const { size, page, skip } = calculatePagination(options);
        const { searchTerm, ...filterData } = filters;

        console.log(filters);

        const andConditions: any = [];

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
            message: 'Books retrived successfully!',
            data: result,
            meta: {
                total,
                page,
                size
            },
        });
    }
)

export default GetBooks;