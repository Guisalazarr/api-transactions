import { Request, Response } from 'express';
import { User } from '../models/user.models';
import { ApiResponse } from '../util/http-response.adapter';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
    public list(req: Request, res: Response) {
        try {
            const { name, email, cpf } = req.query;

            const userList = new UserRepository().list({
                name: name?.toString(),
                email: email?.toString(),
                cpf: Number(cpf),
            });

            return ApiResponse.success(
                res,
                'Users were successfully listed',
                userList.map((user) => user.toJson())
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = new UserRepository().get(id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            return ApiResponse.success(
                res,
                'User was successfully obtained',
                user.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { name, cpf, email, age } = req.body;

            const user = new User(name, cpf, email, age);
            new UserRepository().create(user);

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

            const deletedUser = new UserRepository().delete(id);

            if (!deletedUser) {
                return ApiResponse.notFound(res, 'User');
            }

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

            const user = new UserRepository().get(id);

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
