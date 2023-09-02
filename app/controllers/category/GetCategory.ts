import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const GetCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get single category
        const result = await prisma.category.findMany({
            where: {
                id: req.params.id,
            },
            include: {
                books: true
            }
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category retrived successfully!',
            data: result,
        });
    }
)

export default GetCategory;