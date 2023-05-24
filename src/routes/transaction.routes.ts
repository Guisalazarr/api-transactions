import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

export const transacionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    app.get('/', new TransactionController().list);
    app.post('/', new TransactionController().create);
    app.delete('/:transactionId', new TransactionController().delete);

    return app;
};
