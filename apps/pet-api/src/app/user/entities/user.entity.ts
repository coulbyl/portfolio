import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Pet } from '../../pet/entities/pet.entity'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field(() => String)
  fullName: string

  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String)
  phone: string

  @Field(() => String)
  city: string

  @Field(() => String)
  password: string

  @Field(() => Boolean, { defaultValue: false })
  isAdmin?: boolean = false

  @Field(() => Boolean, { defaultValue: true })
  isActive?: boolean = true

  @Field(() => String)
  createdAt: Date

  @Field(() => String)
  updatedAt: Date

  @Field(() => String, { nullable: true })
  deletedAt?: Date

  @Field(() => [Pet], { defaultValue: [] })
  pets: Pet[]
}
