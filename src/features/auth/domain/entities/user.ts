export interface UserProps {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;
}

export class User {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;

    constructor(props: UserProps) {
        this.validate(props);
        this.id = props.id;
        this.name = props.name.trim();
        this.email = props.email.trim().toLowerCase();
        this.createdAt = props.createdAt;
    }

    private validate(props: UserProps): void {
        if (!props.name || props.name.trim().length === 0) {
            throw new Error('El usuario debe tener un nombre.');
        }

        if (!props.email || props.email.trim().length === 0) {
            throw new Error('El usuario debe tener un correo.');
        }
    }
}