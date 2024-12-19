import { Module, Global } from '@nestjs/common';
import { PrismaClientService } from './prisma_client.service';

@Global()
@Module({
  // This is all of my features
  providers: [PrismaClientService],
  // Export it for routes to use
  exports: [PrismaClientService],
})
export class PrismaClientFeatureModule {}
