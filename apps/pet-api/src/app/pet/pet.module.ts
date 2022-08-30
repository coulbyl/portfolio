import { Module } from '@nestjs/common'
import { PetService } from './pet.service'
import { PetResolver } from './pet.resolver'
import { BackendPrismaService } from '@portfolio/backend/prisma'

@Module({
  providers: [PetResolver, PetService, BackendPrismaService],
})
export class PetModule {}
