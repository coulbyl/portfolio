import { Module } from '@nestjs/common'
import { BackendAuthService } from './backend-auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BackendAuthService, JwtStrategy, JwtService],
  exports: [BackendAuthService, JwtService],
})
export class BackendAuthModule {}
