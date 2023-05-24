import { Transaction } from './transaction.models';
import { v4 as createId } from 'uuid';

export class User {
    private _id: string;
    private _transaction: Transaction[];
    constructor(
        private _name: string,
        private _cpf: string,
        private _email: string,
        private _age: number
    ) {
        this._id = createId();
        this._transaction = [];
    }

    public get name() {
        return this._name;
    }
    public get id() {
        return this._id;
    }

    public get age() {
        return this._age;
    }

    public get email() {
        return this._email;
    }
    public get cpf() {
        return this._cpf;
    }
    public get transaction() {
        return this._transaction;
    }

    public set name(name: string) {
        this._name = name;
    }
    public set age(age: number) {
        this._age = age;
    }

    public set cpf(cpf: string) {
        this._cpf = cpf;
    }

    public set email(email: string) {
        this._email = email;
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
