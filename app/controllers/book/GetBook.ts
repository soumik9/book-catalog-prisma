import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const GetBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get single book
        const result = await prisma.book.findMany({
            where: {
                id: req.params.id,
            },
            // include: {
            //     category: true
            // }
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book fetched successfully!',
            data: result,
        });
    }
)

export default GetBook;