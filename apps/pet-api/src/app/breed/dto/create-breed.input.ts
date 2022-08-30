import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

@InputType()
export class CreateBreedInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  categoryId?: number
}
