import { Transaction, TransactionType } from '../models/transaction.models';
import { User } from '../models/user.models';

interface ListTransactionsParams {
    user: User;
    title?: string;
    type?: TransactionType;
}
export class TransactionRepository {
    public get(user: User, transactionId: string) {
        return user.transaction.find(
            (transaction) => transaction.id === transactionId
        );
    }

    public list(params: ListTransactionsParams) {
        return params.user.transaction.filter(
            (transaction) =>
                (!params.title || transaction.title === params.title) &&
                (!params.type || transaction.type === params.type)
        );
    }

    public create(user: User, transaction: Transaction) {
        user.transaction.push(transaction);
    }

    public delete(user: User, transactionId: string) {
        const findIndex = user.transaction.findIndex(
            (transaction) => transaction.id === transactionId
        );
        if (findIndex < 0) {
            return false;
        }
        return user.transaction.splice(findIndex, 1);
    }
}
