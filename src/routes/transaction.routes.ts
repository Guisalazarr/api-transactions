import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionMiddleware } from '../middlewares/transaction.middleware';

export const transacionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    app.get('/', new TransactionController().list);
    app.post(
        '/',
        [TransactionMiddleware.validateCreateFields],
        new TransactionController().create
    );
    app.delete('/:transactionId', new TransactionController().delete);
    app.put('/:transactionId', new TransactionController().update);

    return app;
};
