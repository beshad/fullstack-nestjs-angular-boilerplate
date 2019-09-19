import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User.interface';
import { CreateUserDTO } from './dto/create-User.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }
  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const Users = await this.UserModel.find().exec();
    return Users;
  }
  // Get a single User
  async getUser(UserID): Promise<User> {
    const User = await this.UserModel.findById(UserID).exec();
    return User;
  }
  // post a single User
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.UserModel(createUserDTO);
    return newUser.save();
  }
  // Edit User details
  async updateUser(UserID, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.UserModel
      .findByIdAndUpdate(UserID, createUserDTO, { new: true });
    return updatedUser;
  }
  // Delete a User
  async deleteUser(UserID): Promise<any> {
    const deletedUser = await this.UserModel.findByIdAndRemove(UserID);
    return deletedUser;
  }

  // check if user email exists
  async validateUserEmail(email): Promise<any> {
    return await this.UserModel.findOne({ email }).exec();
  }

}