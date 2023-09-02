import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const GetCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get all users
        const result = await prisma.user.findMany({
            where: {
                id: req.params.id,
            },
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrived successfully!',
            data: result,
        });
    }
)

export default GetCategory;