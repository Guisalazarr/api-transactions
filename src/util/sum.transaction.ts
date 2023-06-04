import { Transaction, TransactionType } from '../models/transaction.models';

export function sumTransactionsValues(
    transaction: Transaction[],
    type: TransactionType
): number {
    return transaction
        .filter((t) => t.type === type)
        .reduce((sum, transaction) => sum + transaction.value, 0);
}
