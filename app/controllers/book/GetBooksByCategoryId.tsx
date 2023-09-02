import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Book } from '@prisma/client';

const GetBooksByCategoryId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get all books with filter
        const result = await prisma.book.findMany();


        sendResponse<Book[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books with associated category data fetched successfully!',
            data: result,
        });
    }
)

export default GetBooksByCategoryId;