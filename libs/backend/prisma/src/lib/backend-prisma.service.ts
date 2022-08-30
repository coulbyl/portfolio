import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BackendPrismaService extends PrismaClient implements OnModuleInit {
  constructor(public datasources: Prisma.Datasources) {
    super({ datasources })
  }

  async onModuleInit() {
    await this.$connect()

    this.$use(async (params, next) => {
      if (params.model === 'User' && params.action === 'create') {
        const salt = await bcrypt.genSalt(10)
        const password = params.args.data['password']
        params.args.data['password'] = await bcrypt.hash(password, salt)
      }
      return next(params)
    })
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
