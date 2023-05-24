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

    public get id() {
        return this._id;
    }

    public toJson() {
        return {
            id: this._id,
            title: this._title,
            value: this._value,
            type: this._type,
        };
    }
}