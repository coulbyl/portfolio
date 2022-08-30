import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Breed } from '../../breed/entities/breed.entity'
import { Pet } from '../../pet/entities/pet.entity'

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string

  @Field(() => String, { nullable: true })
  deletedAt: string

  @Field(() => [Breed], { defaultValue: [] })
  breeds: Breed[]

  @Field(() => [Pet], { defaultValue: [] })
  pets: Pet[]
}
