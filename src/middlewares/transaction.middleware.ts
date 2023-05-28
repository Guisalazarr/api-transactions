import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
export class TransactionMiddleware {
    public static validateCreateFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { title, value, type } = req.body;

            if (!title) {
                return ApiResponse.notProvided(res, 'Title');
            }
            if (!value) {
                return ApiResponse.notProvided(res, 'Value');
            }
            if (!type) {
                return ApiResponse.notProvided(res, 'Type');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public static validateTypeTransaction(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { type } = req.body;

            if (type !== 'income' && type !== 'outcome' && type !== undefined) {
                return ApiResponse.invalidField(res, 'Type');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
