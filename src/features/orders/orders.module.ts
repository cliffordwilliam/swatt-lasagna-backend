import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Module({
  // This is all of my features
  providers: [OrdersService],
  // Export it for routes to use
  exports: [OrdersService],
})
export class OrdersFeatureModule {}
