/**
 * Definimos un esquema para Mongoose, al estilo Nest, con el uso de decoradores
 * y un SchemaFactory.
 * 
 * Si definimos al documento de tipo HydratedDocument, será devuelto con formato
 * de objeto de Mongoose; si lo hacemos con Document, será un objeto standard Javascript.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UsersDocument = HydratedDocument<User>;
// export type UsersDocument = Document<User>; // Equivalente a lean()

enum Role {
    ADMIN = 'admin',
    PREMIUM = 'premium',
    USER = 'user'
}

@Schema({ collection: 'users_nest' })
export class User {
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    email: string;
    
    @Prop()
    age?: number;
    
    @Prop()
    gender?: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop()
    cart?: string;
    
    @Prop({ default: Role.USER })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);