import { Module } from '@nestjs/common'
import { BreedService } from './breed.service'
import { BreedResolver } from './breed.resolver'
import { BackendPrismaService } from '@portfolio/backend/prisma'

@Module({
  providers: [BreedResolver, BreedService, BackendPrismaService],
})
export class BreedModule {}
