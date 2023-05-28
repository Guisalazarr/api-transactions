import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionMiddleware } from '../middlewares/transaction.middleware';

export const transacionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    app.get('/', new TransactionController().list);
    app.get('/:transactionId', new TransactionController().get);
    app.post(
        '/',
        [
            TransactionMiddleware.validateCreateFields,
            TransactionMiddleware.validateTypeTransaction,
        ],
        new TransactionController().create
    );
    app.delete('/:transactionId', new TransactionController().delete);
    app.put(
        '/:transactionId',
        [TransactionMiddleware.validateTypeTransaction],
        new TransactionController().update
    );

    return app;
};
