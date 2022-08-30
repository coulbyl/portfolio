import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  fullName: string

  @Field(() => String)
  @IsNotEmpty()
  username: string

  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsNotEmpty()
  phone: string

  @Field(() => String)
  @IsNotEmpty()
  city: string

  @Field(() => String)
  @MinLength(8)
  password: string
}
