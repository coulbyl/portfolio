import { ObjectType, Field, Float, Int } from '@nestjs/graphql'
import { Breed } from '../../breed/entities/breed.entity'
import { Category } from '../../category/entities/category.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Pet {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => Float, { nullable: true })
  age?: number

  @Field(() => String)
  description: string

  @Field(() => [String], { defaultValue: [] })
  photos: string[]

  @Field(() => Category, { nullable: true })
  category?: Category

  @Field(() => Int, { nullable: true })
  categoryId?: number

  @Field(() => Breed, { nullable: true })
  breed?: Breed

  @Field(() => Int, { nullable: true })
  breedId?: number

  @Field(() => User, { nullable: true })
  owner?: User

  @Field(() => String, { nullable: true })
  ownerId?: string

  @Field(() => Boolean, { defaultValue: true })
  isAvailable: boolean

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}
