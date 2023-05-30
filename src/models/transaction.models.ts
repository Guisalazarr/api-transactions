import { v4 as createId } from 'uuid';

export enum TransactionType {
    Income = 'I',
    Outcome = 'O',
}

export class Transaction {
    private _id: string;
    constructor(
        private _title: string,
        private _value: number,
        private _type: TransactionType
    ) {
        this._id = createId();
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public get type() {
        return this._type;
    }

    public get value() {
        return this._value;
    }

    public set title(title: string) {
        this._title = title;
    }
    public set valeu(value: number) {
        this._value = value;
    }
    public set type(type: TransactionType) {
        this._type = type;
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
