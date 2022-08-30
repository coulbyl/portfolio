import { CreateCategoryInput } from './create-category.input'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  @IsNumber()
  id: number
}
