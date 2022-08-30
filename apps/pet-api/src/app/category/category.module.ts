import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { BackendPrismaService } from '@portfolio/backend/prisma'

@Module({
  providers: [CategoryResolver, CategoryService, BackendPrismaService],
})
export class CategoryModule {}
