import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Order } from '@prisma/client';


const GetOrders: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // get all orders
        const result = await prisma.order.findMany({
            include: {
                orderedBooks: true,
                user: true
            }
        });

        sendResponse<Order[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order retrived successfully!',
            data: result,
        });
    }
)

export default GetOrders;