import { Controller, forwardRef, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UserController {
  constructor(
    private UserService: UserService
  ) { }

  // login a User
  @Post('login')
  async login(@Res() res, @Body() body): Promise<any> {
    const data = await this.UserService.login(body)
    return res.status(HttpStatus.OK).json({ data })
  }

  // add a User
  @Post('register')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO): Promise<any> {
    const User = await this.UserService.addUser(createUserDTO)
    return res.status(HttpStatus.OK).json({
      message: "User has been created successfully",
      User
    })
  }

  // Retrieve Users list
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getAllUser(@Res() res) {
    const Users = await this.UserService.getAllUser()
    return res.status(HttpStatus.OK).json(Users)
  }

  // Fetch a particular User using ID
  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userID')
  async getUser(@Res() res, @Param('userID') UserID) {
    const User = await this.UserService.getUser(UserID)
    if (!User) throw new NotFoundException('User does not exist!')
    return res.status(HttpStatus.OK).json(User)
  }

  // Update a User's details
  @UseGuards(AuthGuard('jwt'))
  @Put('/update')
  async updateUser(@Res() res, @Query('userID') UserID, @Body() createUserDTO: CreateUserDTO) {
    const User = await this.UserService.updateUser(UserID, createUserDTO)
    if (!User) throw new NotFoundException('User does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      User
    })
  }

  // Delete a User
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('UserID') UserID) {
    const User = await this.UserService.deleteUser(UserID)
    if (!User) throw new NotFoundException('User does not exist')
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      User
    })
  }

}