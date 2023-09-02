import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { User } from '@prisma/client';


const UpdateUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // update user
        const result = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

        sendResponse<User>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
)

export default UpdateUser;