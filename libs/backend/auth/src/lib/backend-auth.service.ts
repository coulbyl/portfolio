import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

interface LoginPayload {
  email: string
  id: number | string
  isAdmin?: boolean
  isActive?: boolean
}

@Injectable()
export class BackendAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser<T>(user: T & { password: string }, password: string) {
    if (user && bcrypt.compareSync(password, user.password)) return user
    throw new BadRequestException('Invalid credentials')
  }

  async login<T>(user: T & LoginPayload) {
    const payload = {
      email: user.email,
      id: user.id,
      isAdmin: user?.isAdmin,
      isActive: user?.isActive,
      sub: user.id,
    }
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: '1d',
      }),
    }
  }
}
