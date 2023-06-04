import { Request, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
import { UserRepository } from '../repositories/user.repository';
import { TransactionRepository } from '../repositories/transactions.repository';
import { Transaction, TransactionType } from '../models/transaction.models';
import { sumTransactionsValues } from '../util/sum.transaction';

export class TransactionController {
    public list(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, type } = req.query;

            const user = new UserRepository().get(id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            let transactions = new TransactionRepository().list({
                user,
                title: title?.toString(),
                type: type as TransactionType,
            });

            let income = sumTransactionsValues(
                transactions,
                TransactionType.Income
            );

            let outcome = sumTransactionsValues(
                transactions,
                TransactionType.Outcome
            );

            const transactionToJson = transactions.map((transaction) =>
                transaction.toJson()
            );

            return ApiResponse.success(
                res,
                'Transactions successfully listed',
                {
                    transactionToJson,
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

            const user = new UserRepository().get(id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            const transaction = new TransactionRepository().get(
                user,
                transactionId
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

            const user = new UserRepository().get(id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }
            const transaction = new Transaction(title, value, type);
            new TransactionRepository().create(user, transaction);

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

            const user = new UserRepository().get(id);
            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            const transactionDeleted = new TransactionRepository().delete(
                user,
                transactionId
            );

            if (!transactionDeleted) {
                return ApiResponse.notFound(res, 'Transaction');
            }

            return ApiResponse.success(
                res,
                'Transaction was successfully deleted',
                transactionDeleted[0].toJson()
            );
        } catch (error: any) {
            return ApiResponse.serverError(res, error);
        }
    }

    public update(req: Request, res: Response) {
        try {
            const { id, transactionId } = req.params;
            const { title, value, type } = req.body;

            const user = new UserRepository().get(id);

            if (!user) {
                return ApiResponse.notFound(res, 'User');
            }

            const transaction = new TransactionRepository().get(
                user,
                transactionId
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
