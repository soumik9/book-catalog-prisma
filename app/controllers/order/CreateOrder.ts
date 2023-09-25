import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/helpers/catchAsync';
import httpStatus from 'http-status'
import sendResponse from '../../../utils/helpers/SendResponse';
import prisma from '../../../utils/helpers/prisma';
import { Order, OrderedBook } from '@prisma/client';


const createOrder: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // creating new order
        const result = await prisma.order.create({
            data: {
                userId: req?.user?.userId,
                orderedBooks: {
                    create: req.body.orderedBooks.map((book: OrderedBook) => ({
                        bookId: book.bookId,
                        quantity: book.quantity,
                    })),
                },
            },
            include: {
                orderedBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    }
                }
            }
        });

        sendResponse<Order>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
)

export default createOrder;