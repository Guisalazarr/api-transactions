import { users } from '../database/users';
import { User } from '../models/user.models';

interface ListUserParams {
    name?: string;
    email?: string;
    cpf?: number;
}

export class UserRepository {
    public get(id: string) {
        return users.find((user) => user.id === id);
    }

    public list(params: ListUserParams) {
        return users.filter((user) => {
            if (params.name) {
                return user.name === params.name;
            } else if (params.email) {
                return user.email === params.email;
            } else if (params.cpf) {
                return user.cpf === params.cpf;
            } else {
                return user;
            }
        });
    }

    public create(user: User) {
        return users.push(user);
    }

    public delete(id: string) {
        const findIndex = users.findIndex((user) => user.id === id);
        if (findIndex < 0) {
            return false;
        }
        return users.splice(findIndex, 1);
    }

    public validateAlreadyExist(params: string | number) {
        return users.some(
            (user) => user.cpf === params || user.email === params
        );
    }
}
