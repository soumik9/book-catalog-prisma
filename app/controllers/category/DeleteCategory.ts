import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const DeleteCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // delete a user
        const result = await prisma.user.delete({
            where: {
                id: req.params.id
            },
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User deleted successfully!',
            data: result,
        });
    }
)

export default DeleteCategory;