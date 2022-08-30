import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { BackendAuthService, BackendAuthModule } from '@portfolio/backend/auth'
import { BackendPrismaService } from '@portfolio/backend/prisma'

@Module({
  imports: [BackendAuthModule],
  providers: [
    UserResolver,
    UserService,
    BackendAuthService,
    BackendPrismaService,
  ],
})
export class UserModule {}
