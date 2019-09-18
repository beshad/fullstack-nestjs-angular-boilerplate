import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService, private authService: AuthService) { }

  // login a User
  @Post('/login')
  async login(@Res() res, @Body() body) {
    let user = await this.UserService.validateUserEmail(body.email);
    console.log(user);

      res.status(HttpStatus.OK).json({
        message: "User can login"
      })
    
    // if (!user) throw new NotFoundException('User does not exist!');
    // const User = await this.authService.login(body);
    // return res.status(HttpStatus.OK).json({
    //   message: "User can login",
    //   User
    // })
  }

  // add a User
  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const User = await this.UserService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: "User has been created successfully",
      User
    })
  }

  // Retrieve Users list
  @Get('users')
  async getAllUser(@Res() res) {
    const Users = await this.UserService.getAllUser();
    return res.status(HttpStatus.OK).json(Users);
  }

  // Fetch a particular User using ID
  @Get('user/:userID')
  async getUser(@Res() res, @Param('userID') UserID) {
    const User = await this.UserService.getUser(UserID);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(User);
  }

  // Update a User's details
  @Put('/update')
  async updateUser(@Res() res, @Query('userID') UserID, @Body() createUserDTO: CreateUserDTO) {
    const User = await this.UserService.updateUser(UserID, createUserDTO);
    if (!User) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      User
    });
  }

  // Delete a User
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('UserID') UserID) {
    const User = await this.UserService.deleteUser(UserID);
    if (!User) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      User
    })
  }

}