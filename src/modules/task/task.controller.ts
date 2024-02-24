import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Request,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';
import { TaskService } from './task.service';

import {
  idTaskSchema,
  IdTaskDto,
  createTaskSchema,
  CreateTaskDto,
  updateTaskSchema,
  UpdateTaskDto,
} from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(@Request() req: ExpressRequest & { user: { email: string } }) {
    console.log('req.user');
    console.log(req.user.email);
    return this.taskService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ZodValidationPipe(idTaskSchema)) id: IdTaskDto,
  ) {
    try {
      return await this.taskService.getById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createTaskSchema)) data: CreateTaskDto,
  ) {
    return this.taskService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', new ZodValidationPipe(idTaskSchema)) id: IdTaskDto,
    @Body(new ZodValidationPipe(updateTaskSchema)) data: UpdateTaskDto,
  ) {
    try {
      return await this.taskService.update(id, data);
    } catch (error) {
      throw new BadRequestException('Item not found');
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(idTaskSchema)) id: IdTaskDto,
  ) {
    try {
      return await this.taskService.delete(id);
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }
}
