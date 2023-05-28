import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export class CpfMiddleware {
    public static validateCpf(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;

            if (!cpf) {
                return ApiResponse.notProvided(res, 'CPF');
            }

            const isValid = cpfValidator.isValid(
                cpf.toString().padStart(11, '0')
            );
            if (!isValid) {
                return ApiResponse.invalidField(res, 'CPF');
            }

            next();
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
