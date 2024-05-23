// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Patch, Post, Put, } from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UpdatePutUserDTO } from './update-put-user.dto';
import { UpdatePatchUserDTO } from './update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.show(id);
    } catch (error) {
      console.error('Error in UserController:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutUserDTO,
  ) {
    try {
      return await this.userService.update(id, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDTO,
  ) {
    try {
      return await this.userService.updatePartial(id, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
