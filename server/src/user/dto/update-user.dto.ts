import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  readonly name: string
  readonly email: string
  readonly password: string
  readonly fullname: string
  readonly role: String
}