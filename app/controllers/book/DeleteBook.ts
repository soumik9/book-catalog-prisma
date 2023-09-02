import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const DeleteBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // delete a category
        const result = await prisma.book.delete({
            where: {
                id: req.params.id
            },
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book is deleted successfully!',
            data: result,
        });
    }
)

export default DeleteBook;