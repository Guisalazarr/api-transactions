import express, { Request, Response } from 'express';
import { UserController } from './controllers/user.controller';

const app = express();
app.use(express.json());

app.listen(3333, () => {
    console.log('API is running...');
});

app.get('/user', (req: Request, res: Response) => {
    new UserController().list(req, res);
});

app.get('/user/:id', (req: Request, res: Response) => {
    new UserController().get(req, res);
});

app.post('/user', (req: Request, res: Response) => {
    new UserController().create(req, res);
});
