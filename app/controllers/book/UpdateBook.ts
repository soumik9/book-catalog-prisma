import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const UpdateBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // update Category
        const result = await prisma.book.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book updated successfully!',
            data: result,
        });
    }
)

export default UpdateBook;