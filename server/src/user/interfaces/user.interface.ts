// used for type-checking
import { Document } from 'mongoose';

export interface User extends Document {
    readonly _id?: number;
    readonly password?: string;
    readonly email?: string;
    readonly created_at?: Date;
}