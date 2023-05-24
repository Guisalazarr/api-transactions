import { Request, Response } from 'express';
import { users } from '../database/users';
import { User } from '../models/user.models';

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

            return res.status(200).send({
                ok: true,
                message: 'Users were successfully listed',
                data: result.map((user) => user.toJson()),
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result = users.find((user) => user.id === id);

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: 'User was not found',
                });
            }

            return res.status(200).send({
                ok: true,
                message: 'User was successfully obtained',
                data: result.toJson(),
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { name, cpf, email, age } = req.body;

            if (!name) {
                return res.status(400).send({
                    ok: false,
                    message: 'Name was not provided',
                });
            }
            if (!cpf) {
                return res.status(400).send({
                    ok: false,
                    message: 'CPF was not provided',
                });
            }
            if (!email) {
                return res.status(400).send({
                    ok: false,
                    message: 'Email was not provided',
                });
            }

            if (!age) {
                return res.status(400).send({
                    ok: false,
                    message: 'Age was not provided',
                });
            }

            if (users.some((user) => user.cpf === cpf)) {
                return res.status(400).send({
                    ok: false,
                    message: 'User already has registration',
                });
            }

            const user = new User(name, cpf, email, age);
            users.push(user);

            return res.status(201).send({
                ok: true,
                message: 'User was successfully created',
                data: user.toJson(),
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userIndex = users.findIndex((item) => item.id === id);

            if (userIndex < 0) {
                return res.status(400).send({
                    ok: false,
                    message: 'User was not found',
                });
            }

            const deletedUser = users.splice(userIndex, 1);

            return res.status(201).send({
                ok: true,
                message: 'User was successfully deleted',
                data: deletedUser[0].toJson(),
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, cpf, email, age } = req.body;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return res.status(400).send({
                    ok: false,
                    message: 'User was not found',
                });
            }

            user.name = name;
            user.cpf = cpf;
            user.email = email;
            user.age = age;

            return res.status(201).send({
                ok: true,
                message: 'User was successfully edited',
                data: user.toJson(),
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
