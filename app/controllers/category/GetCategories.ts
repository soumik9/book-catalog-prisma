import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Category } from '@prisma/client';


const GetCategories: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get all Categories
        const result = await prisma.category.findMany();

        sendResponse<Category[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Categories retrived successfully!',
            data: result,
        });
    }
)

export default GetCategories;