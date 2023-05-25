import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { transacionRoutes } from './transaction.routes';
import { UserMiddleware } from '../middlewares/user.middleware';

export const userRoutes = () => {
    const app = Router();

    app.get('/', new UserController().list);
    app.get('/:id', new UserController().get);
    app.post(
        '/',
        [
            UserMiddleware.validateCreateFields,
            UserMiddleware.validateAlreadyExist,
        ],
        new UserController().create
    );
    app.put('/:id', new UserController().update);
    app.delete('/:id', new UserController().delete);

    app.use('/:id/transaction', transacionRoutes());

    return app;
};
