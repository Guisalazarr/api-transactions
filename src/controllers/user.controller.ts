import { Request, Response } from 'express';
import { users } from '../database/users';
import { User } from '../models/user.models';
import { ApiResponse } from '../util/http-response.adapter';

export class UserController {
    public list(req: Request, res: Response) {
        try {
            const { name, email, cpf } = req.query;

            let result = users;

            if (name) {
                result = users.filter((user) => user.name === name);
            }
            if (email) {
                result = users.filter((user) => user.email === email);
            }
            if (cpf) {
                result = users.filter((user) => user.cpf === cpf);
            }
            return ApiResponse.success(
                res,
                'Users were successfully listed',
                result.map((user) => user.toJson())
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userGet = users.find((item) => item.id === id);

            if (!userGet) {
                return ApiResponse.notFound(res, 'User');
            }

            return ApiResponse.success(
                res,
                'User was successfully obtained',
                userGet.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { name, cpf, email, age } = req.body;

            const user = new User(name, cpf, email, age);
            users.push(user);

            return ApiResponse.createSuccess(
                res,
                'User was successfully created',
                user.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userIndex = users.findIndex((item) => item.id === id);

            if (userIndex < 0) {
                return ApiResponse.notFound(res, 'User');
            }

            const deletedUser = users.splice(userIndex, 1);

            return ApiResponse.success(
                res,
                'User was successfully deleted',
                deletedUser[0].toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, cpf, email, age } = req.body;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }
            if (name) {
                user.name = name;
            }
            if (cpf) {
                user.cpf = cpf;
            }
            if (email) {
                user.email = email;
            }
            if (age) {
                user.age = age;
            }

            return ApiResponse.success(
                res,
                'User edited successfully',
                user.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
