import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Category } from '@prisma/client';


const CreateCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new category
        const result = await prisma.category.create({
            data: req.body
        });

        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category created successfully!',
            data: result,
        });
    }
)

export default CreateCategory;