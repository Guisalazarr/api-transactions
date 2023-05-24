import { Request, Response } from 'express';
import { users } from '../database/users';
import { Transaction } from '../models/transaction.models';

export class TransactionController {
    public list(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return res.status(400).send({
                    ok: false,
                    message: 'User was not afound',
                });
            }

            return res.status(200).send({
                ok: true,
                message: 'Transactions successfully listed',
                data: user.transaction.map((item) => item.toJson()),
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
            const { id } = req.params;
            const { title, value, type } = req.body;

            if (!title) {
                return res.status(400).send({
                    ok: false,
                    message: 'Title was not provided',
                });
            }
            if (!value) {
                return res.status(400).send({
                    ok: false,
                    message: 'Value was not provided',
                });
            }
            if (!type) {
                return res.status(400).send({
                    ok: false,
                    message: 'Type was not provided',
                });
            }
            const user = users.find((item) => item.id === id);

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User was not found',
                });
            }
            const transaction = new Transaction(title, value, type);
            user.transaction.push(transaction);

            return res.status(201).send({
                ok: true,
                message: 'Transactions successfully added',
                data: transaction.toJson(),
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
            const { id, transactionId } = req.params;

            const user = users.find((item) => item.id === id);
            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User was not found',
                });
            }

            const transactionIndex = user.transaction.findIndex(
                (item) => item.id === transactionId
            );

            if (transactionIndex < 0) {
                return res.status(404).send({
                    ok: false,
                    message: 'Transaction was not found',
                });
            }

            const deletedTransaction = user.transaction.splice(
                transactionIndex,
                1
            );

            return res.status(200).send({
                ok: true,
                message: 'Transaction was successfully deleted',
                data: deletedTransaction[0].toJson(),
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
