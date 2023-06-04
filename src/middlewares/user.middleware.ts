import { Request, NextFunction, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
import { UserRepository } from '../repositories/user.repository';

export class UserMiddleware {
    public static validateCreateFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, cpf, email, age } = req.body;

            if (!name) {
                return ApiResponse.notProvided(res, 'Name');
            }
            if (!cpf) {
                return ApiResponse.notProvided(res, 'CPF');
            }
            if (!email) {
                return ApiResponse.notProvided(res, 'Email');
            }

            if (!age) {
                return ApiResponse.notProvided(res, 'Age');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public static validateAlreadyExist(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { cpf, email } = req.body;

            const findCpf = new UserRepository().validateAlreadyExist(cpf);
            if (findCpf) {
                return ApiResponse.badRequest(
                    res,
                    `User already exists with CPF: ${cpf}`
                );
            }

            const findEmail = new UserRepository().validateAlreadyExist(email);
            if (findEmail) {
                return ApiResponse.badRequest(
                    res,
                    `User already exists with email: ${email}`
                );
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
