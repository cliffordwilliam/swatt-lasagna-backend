import { Module } from '@nestjs/common';
import { OrdersRouteModule } from './routes/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientFeatureModule } from './features/prisma_client/prisma_client.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaClientFeatureModule,
    OrdersRouteModule,
  ],
})
export class AppModule {}
