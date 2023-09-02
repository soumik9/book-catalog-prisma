import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Category } from '@prisma/client';


const DeleteCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // delete a category
        const result = await prisma.category.delete({
            where: {
                id: req.params.id
            },
        });

        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category deleted successfully!',
            data: result,
        });
    }
)

export default DeleteCategory;