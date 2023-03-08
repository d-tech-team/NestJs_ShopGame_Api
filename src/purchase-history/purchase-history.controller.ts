import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { PurchaseHistoryService } from './purchase-history.service';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RoleGuard, { Roles } from 'src/auth/guards/role-auth.guard';

@Controller('purchase')
export class PurchaseHistoryController {
  constructor(private readonly purchaseHistoryService: PurchaseHistoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Roles.User))
  create(@Body() createPurchaseHistoryDto: CreatePurchaseHistoryDto, @Headers() header: any) {
    return this.purchaseHistoryService.create(createPurchaseHistoryDto, header);
  }

  @Get()
  @UseGuards(RoleGuard(Roles.User))
  findAll(@Headers() header: any) {
    return this.purchaseHistoryService.findAll(header);
  }

  @Get(':id')
  @UseGuards(RoleGuard(Roles.User))
  findOne(@Param('id') id: string,@Headers() header: any) {
    return this.purchaseHistoryService.findOne(id,header);
  }

}
