import { Transaction } from './transaction';
import { v4 as createId } from 'uuid';

export class User {
    private _id: string;
    private _transactions: Transaction[];
    constructor(
        private _name: string,
        private _cpf: string,
        private _email: string,
        private _age: number
    ) {
        this._id = createId();
        this._transactions = [];
    }

    public get name() {
        return this._name;
    }
    public get id() {
        return this._id;
    }

    public get email() {
        return this._email;
    }
    public get cpf() {
        return this._cpf;
    }

    public toJson() {
        return {
            id: this._id,
            name: this._name,
            cpf: this._cpf,
            email: this._email,
            age: this._age,
        };
    }
}
