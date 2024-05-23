// eslint-disable-next-line prettier/prettier
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './update-put-user.dto';
import { UpdatePatchUserDTO } from './update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    if (id === undefined || id === null) {
      throw new InternalServerErrorException('ID is required');
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
  async update(id: number, data: UpdatePutUserDTO) {
    if (id === undefined || id === null) {
      throw new InternalServerErrorException('ID is required');
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(), // Automatic reload
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    if (id === undefined || id === null) {
      throw new InternalServerErrorException('ID is required');
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(), // Automatic reload
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async delete(id: number) {
    if (id === undefined || id === null) {
      throw new InternalServerErrorException('ID is required');
    }

    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
