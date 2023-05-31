import { Request, Response } from 'express';
import { users } from '../database/users';
import { ApiResponse } from '../util/http-response.adapter';
import { Transaction, TransactionType } from '../models/transaction.models';

export class TransactionController {
    public list(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, type } = req.query;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }
            let transactions = user.transaction;

            if (title) {
                transactions = user.transaction.filter(
                    (item) => item.title === title
                );
            }
            if (type) {
                transactions = user.transaction.filter(
                    (item) => item.type === type
                );
            }

            let income = transactions
                .filter((item) => item.type === TransactionType.Income)
                .reduce((initial, current) => initial + current.value, 0);

            let outcome = transactions
                .filter((item) => item.type === TransactionType.Outcome)
                .reduce((initial, current) => initial + current.value, 0);

            const result = transactions.map((item) => item.toJson());

            return ApiResponse.success(
                res,
                'Transactions successfully listed',
                {
                    result,
                    balance: {
                        income,
                        outcome,
                        total: income - outcome,
                    },
                }
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public get(req: Request, res: Response) {
        try {
            const { id, transactionId } = req.params;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            const transaction = user.transaction.find(
                (item) => item.id === transactionId
            );

            if (!transaction) {
                return ApiResponse.notFound(res, 'Transaction');
            }

            return ApiResponse.success(
                res,
                'Transaction successfully listed',
                transaction.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, value, type } = req.body;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }
            const transaction = new Transaction(title, value, type);
            user.transaction.push(transaction);

            return ApiResponse.createSuccess(
                res,
                'Transaction',
                transaction.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public delete(req: Request, res: Response) {
        try {
            const { id, transactionId } = req.params;

            const user = users.find((item) => item.id === id);
            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            const transactionIndex = user.transaction.findIndex(
                (item) => item.id === transactionId
            );

            if (transactionIndex < 0) {
                return ApiResponse.notFound(res, 'Transaction');
            }

            const deletedTransaction = user.transaction.splice(
                transactionIndex,
                1
            );

            return ApiResponse.success(
                res,
                'Transaction was successfully deleted',
                deletedTransaction[0].toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public update(req: Request, res: Response) {
        try {
            const { id, transactionId } = req.params;
            const { title, value, type } = req.body;

            const user = users.find((item) => item.id === id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            const transaction = user.transaction.find(
                (item) => item.id === transactionId
            );

            if (!transaction) {
                return ApiResponse.notFound(res, 'Transaction');
            }

            if (title) {
                transaction.title = title;
            }
            if (value) {
                transaction.valeu = value;
            }
            if (type) {
                transaction.type = type;
            }

            return ApiResponse.success(
                res,
                'Transaction updated successfully',
                transaction.toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }
}
