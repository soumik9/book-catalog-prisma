import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';


const Signup: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new user
        const result = await prisma.user.create({
            data: req.body
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
)

export default Signup;