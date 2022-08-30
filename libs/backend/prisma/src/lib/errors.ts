/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'

interface ErrorMessage {
  INTEGRITY?: string
  NOT_FOUND?: string
  NESTED_FOREIGN_KEY?: string
}

export function handlePrismaError(error: any, message: ErrorMessage) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throwIntegrityException(error.code, message.INTEGRITY)
    throwNotFoundExeception(error.code, message.NOT_FOUND)
    throwNestedForeignKeyException(error.code, message.NESTED_FOREIGN_KEY)
  }
  throw new InternalServerErrorException(error)
}

function throwNotFoundExeception(code: string, message: string) {
  if (code === 'P2025') throw new NotFoundException(message)
}

function throwIntegrityException(code: string, message: string) {
  if (code === 'P2002') throw new BadRequestException(message)
}

function throwNestedForeignKeyException(code: string, message: string) {
  if (code === 'P2003') throw new BadRequestException(message)
}
