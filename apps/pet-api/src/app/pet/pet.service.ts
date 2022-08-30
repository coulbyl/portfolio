import { Injectable, NotFoundException } from '@nestjs/common'
import {
  BackendPrismaService,
  handlePrismaError,
} from '@portfolio/backend/prisma'
import { User } from '../user/entities/user.entity'
import { CreatePetInput } from './dto/create-pet.input'
import { UpdatePetInput } from './dto/update-pet.input'

@Injectable()
export class PetService {
  private relations = { category: true, breed: true, owner: true }

  constructor(private readonly prismaService: BackendPrismaService) {}

  async create(createPetInput: CreatePetInput, user: User) {
    const inputWithUser = { ...createPetInput, ownerId: user.id }
    return this.handleErrors(() => {
      return this.prismaService.pet.create({
        data: inputWithUser,
        include: this.relations,
      })
    })
  }

  findAll() {
    return this.prismaService.pet.findMany({ include: this.relations })
  }

  async findOne(id: number) {
    const pet = await this.prismaService.pet.findFirst({
      where: { id },
      include: this.relations,
    })
    if (!pet) throw new NotFoundException('Pet not found')
    return pet
  }

  async update({ id, ...updatePetInput }: UpdatePetInput) {
    return this.handleErrors(() => {
      return this.prismaService.pet.update({
        where: { id },
        data: updatePetInput,
        include: this.relations,
      })
    })
  }

  async remove(id: number) {
    return this.handleErrors(() =>
      this.prismaService.pet.delete({ where: { id } }),
    )
  }

  private async handleErrors<T>(fn: () => Promise<T>) {
    try {
      return await fn()
    } catch (error) {
      handlePrismaError(error, {
        NOT_FOUND: 'Pet not found',
        INTEGRITY: 'Pet already exist',
        NESTED_FOREIGN_KEY: 'Category or Breed not found',
      })
    }
  }
}
