import { v4 as createId } from 'uuid';

export class Transaction {
    private _id: string;
    constructor(
        private _title: string,
        private _value: number,
        private _type: 'income' | 'outcome'
    ) {
        this._id = createId();
    }
}
