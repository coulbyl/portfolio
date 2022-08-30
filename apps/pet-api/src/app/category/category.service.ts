import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'
import {
  BackendPrismaService,
  handlePrismaError,
} from '@portfolio/backend/prisma'

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: BackendPrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      return await this.prismaService.category.create({
        data: createCategoryInput,
        include: { pets: true, breeds: true },
      })
    } catch (error) {
      handlePrismaError(error, { INTEGRITY: 'Category already exists' })
    }
  }

  findAll() {
    return this.prismaService.category.findMany({
      where: { deletedAt: null },
      include: { pets: true, breeds: true },
    })
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findFirst({
      where: { id, deletedAt: null },
      include: { pets: true, breeds: true },
    })
    if (!category) throw new NotFoundException('Category not found')
    return category
  }

  update({ id, ...updateCategoryInput }: UpdateCategoryInput) {
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryInput,
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
