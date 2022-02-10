import { Deserializable } from './deserializable.model';

export class UserModel implements Deserializable {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
