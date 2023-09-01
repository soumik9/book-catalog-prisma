import { Prisma } from '@prisma/client';
import { IErrorResponse } from '../interfaces/types';

const handleValidationError = (
    error: Prisma.PrismaClientValidationError
): IErrorResponse => {
    const errors = [{
        path: "",
        message: error.message,
    }]
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};

export default handleValidationError;