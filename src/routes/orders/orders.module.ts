import { Module } from '@nestjs/common';
import { OrdersFeatureModule } from '../../features/orders/orders.module';
import { OrdersController } from './orders.controller';

@Module({
  // This is all of my routes
  controllers: [OrdersController],
  // Features that this routes need
  imports: [OrdersFeatureModule],
})
export class OrdersRouteModule {}
