import { CreatePetInput } from './create-pet.input'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @Field(() => Int)
  @IsNumber()
  id: number

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isAvailable?: boolean
}
