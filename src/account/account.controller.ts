import { Controller, Get, Post, Body, Patch, Param, Delete, Response, UseInterceptors, UploadedFiles, UploadedFile, Request, Put, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import RoleGuard, { Roles } from 'src/auth/guards/role-auth.guard';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  @UseGuards(RoleGuard(Roles.Admin))
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  create(@Body() createDto: CreateAccountDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.accountService.create(createDto, files);
  }

  @Get()
  async findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard(Roles.Admin))
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.accountService.update(id, updateAccountDto, files);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Roles.Admin))
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }
}
