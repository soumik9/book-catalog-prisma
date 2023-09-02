import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { User } from '@prisma/client';


const GetUsers: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get all users
        const result = await prisma.user.findMany();

        sendResponse<User[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Users retrived successfully!',
            data: result,
        });
    }
)

export default GetUsers;