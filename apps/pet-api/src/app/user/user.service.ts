import { Injectable } from '@nestjs/common'
import {
  BackendPrismaService,
  handlePrismaError,
} from '@portfolio/backend/prisma'
import { PrismaPromise } from '@prisma/client'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: BackendPrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.prismaService.user.create({
        data: createUserInput,
        include: { pets: true },
      })
    } catch (error) {
      handlePrismaError(error, { INTEGRITY: 'User already exists' })
    }
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  findOneBy(criteria: { id?: number; email?: string }) {
    return this.prismaService.user.findUniqueOrThrow({
      where: criteria,
      include: { pets: true },
    })
  }

  update({ id, ...updateUserInput }: UpdateUserInput) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    })
  }

  async remove(id: number) {
    const user = await this.findOneBy({ id })
    const transactions: PrismaPromise<unknown>[] = [this.deleteUser(id)]
    if (user.pets.length) transactions.push(this.deletePets(id))
    return this.prismaService.$transaction(transactions)
  }

  private deletePets(id: number) {
    return this.prismaService.pet.deleteMany({ where: { ownerId: id } })
  }

  private deleteUser(id: number) {
    return this.prismaService.user.delete({ where: { id } })
  }
}
