import { Transaction } from '../models/transaction.models';
import { User } from '../models/user.models';

export const users = [
    new User('José', '61802987002', 'jose@teste.com', 20),
    new User('Pedro', '40831238003', 'pedro@teste.com', 26),
    new User('Maria', '17847963019', 'maria@teste.com', 30),
    new User('Ana', '58520595014', 'ana@teste.com', 23),
    new User('João', '42773808088', 'joao@teste.com', 19),
    new User('Janaina', '74536237070', 'janaina@teste.com', 27),
];

users[0].transaction.push(new Transaction('Mercado', 20, 'outcome'));
users[0].transaction.push(new Transaction('Aluguel', 500, 'income'));
users[1].transaction.push(new Transaction('Roupas', 500, 'outcome'));
users[1].transaction.push(new Transaction('Gasolina', 500, 'income'));
