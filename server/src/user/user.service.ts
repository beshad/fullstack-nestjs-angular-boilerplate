import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { SignUpNewUserDTO } from '../auth/dto/sign-up.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  private readonly users: User[];

  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly authService: AuthService
  ) { }

  // authenticate user
  async login(payload:any):Promise<any> {
    let { email, password } = payload;
    return await this.authService.authenticateUser(email, password);
  }

  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const Users = await this.UserModel.find().exec();
    return Users;
  }
  // Get a single User
  async getUser(id): Promise<User> {
    const User = await this.UserModel.findById(id).exec();
    return User;
  }
  // post a single User
  async addUser(signUpNewUserDTO: SignUpNewUserDTO): Promise<User> {
    const newUser = await this.UserModel(signUpNewUserDTO);
    return newUser.save();
  }
  // Edit User details
  async updateUser(id, signUpNewUserDTO: SignUpNewUserDTO): Promise<User> {
    const updatedUser = await this.UserModel
      .findByIdAndUpdate(id, signUpNewUserDTO, { new: true });
    return updatedUser;
  }
  // Delete a User
  async deleteUser(id): Promise<any> {
    const deletedUser = await this.UserModel.findByIdAndRemove(id);
    return deletedUser;
  }

}