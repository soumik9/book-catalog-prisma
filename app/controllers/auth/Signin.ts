import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status'
import ApiError from '../../../utils/errors/ApiError';
import catchAsync from '../../../utils/helpers/catchAsync';
import { Secret } from 'jsonwebtoken';
import createToken from '../../../utils/helpers/jwt/createToken';
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { ILoginResponse } from '../../../utils/interfaces/types';

const Signin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const email = req.body.email;
        const password = req.body.password;

        // checking is admin exists
        const isUserExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!isUserExists) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');

        // checking is password valid
        if (isUserExists.password !== password) throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');

        // destructing 
        const { id, role } = isUserExists;

        // creating accesstoken & refreshtoken
        const accessToken = createToken({ userId: id, role }, process.env.JWT_SECRET as Secret, process.env.JWT_EXPIRES_IN as string);

        sendResponse<ILoginResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User signin successfully!',
            data: undefined,
            token: accessToken,
        });
    }
)

export default Signin;