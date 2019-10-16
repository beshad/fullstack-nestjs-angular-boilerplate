// used for type-checking
import { Document } from 'mongoose'

export interface User extends Document {
    readonly password?: string
    readonly confirmPaswrd?: string
    readonly fullname?: string
    readonly email?: string
    readonly created_at?: Date
    readonly role?: String
}