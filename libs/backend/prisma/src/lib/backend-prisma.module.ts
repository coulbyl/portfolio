import { Module } from '@nestjs/common'
import { BackendPrismaService } from './backend-prisma.service'

@Module({
  exports: [BackendPrismaService],
})
export class BackendPrismaModule {}
