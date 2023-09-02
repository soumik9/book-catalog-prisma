import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const CreateBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new book
        const result = await prisma.book.create({
            data: req.body
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book created successfully!',
            data: result,
        });
    }
)

export default CreateBook;