export class User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string = 'user'; // role es de tipo string y por defecto su valor es user
    nickname?: string; // nickname es de tipo string, opcional (?)
}
