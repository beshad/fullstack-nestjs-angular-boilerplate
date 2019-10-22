// defines how the data will be sent over the network
export class CreateUserDTO {
  readonly name: string
  readonly email: string
  readonly created_at: Date
  readonly password: string
  readonly fullname: string
  readonly role: String
}
