import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Order, UserRoles } from '@prisma/client';
import ApiError from '../../../utils/errors/ApiError';


const GetOrder: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        let result;

        if (req?.user?.role === UserRoles.admin) {
            // get all orders
            result = await prisma.order.findUnique({
                where: {
                    id: req.params.orderId
                },
                include: {
                    orderedBooks: true,
                    user: true
                }
            });
        } else {
            // get all orders by specific customer
            result = await prisma.order.findUnique({
                where: {
                    userId: req?.user?.userId,
                    id: req.params.orderId
                },
                include: {
                    orderedBooks: true,
                    user: true
                }
            });

            if (!result) {
                // Throw an error indicating that no order was found
                throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to this order!');
            }
        }

        sendResponse<Order>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order retrived successfully!',
            data: result,
        });
    }
)

export default GetOrder;