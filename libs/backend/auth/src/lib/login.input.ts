import { IsEmail, IsNotEmpty } from 'class-validator'
import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsNotEmpty()
  password: string
}

@ObjectType()
export class LoginResult {
  @Field(() => String)
  accessToken: string
}
