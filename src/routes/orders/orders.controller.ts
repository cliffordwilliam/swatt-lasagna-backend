import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from '../../features/orders/orders.service';
import { Order, Prisma } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderData: Prisma.OrderCreateInput): Promise<Order> {
    return this.ordersService.create(createOrderData);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderData: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    return this.ordersService.update({
      where: { id },
      data: updateOrderData,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Order> {
    return this.ordersService.remove({ id });
  }
}
